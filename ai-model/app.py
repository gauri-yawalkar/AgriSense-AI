import os
import cv2
import base64
import numpy as np
import json
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import torch
import torchvision.transforms as transforms
from torchvision.models import efficientnet_b0
from PIL import Image

app = Flask(__name__)
CORS(app)

# Base path for models relative to this script (app.py is now in All_Models folder)
MODELS_BASE_PATH = os.path.dirname(os.path.abspath(__file__))

# Available models mapping for standard inference
AVAILABLE_MODELS = {
    "Crop vs Weed": os.path.join(MODELS_BASE_PATH, "crop-weed", "best.pt"),
    "Plant Disease": os.path.join(MODELS_BASE_PATH, "plant-disease-classification-detection", "best.pt"),
    "Crop Detection": os.path.join(MODELS_BASE_PATH, "crop-detection", "yolov8n.pt"),
    "Tomato Disease": os.path.join(MODELS_BASE_PATH, "tomato", "best.pt"),
}

# Weed pipeline models
WEED_DET_PATH = os.path.join(MODELS_BASE_PATH, "Weed_Type", "best_model.pt")
WEED_CLS_PATH = os.path.join(MODELS_BASE_PATH, "Weed_Type", "weed_cls_model.pt")

# EfficientNet Models Configuration
EFFNET_CONFIG = {
    "corn": {
        "model_path": os.path.join(MODELS_BASE_PATH, "corn", "best_corn_effnet.pth"),
        "mapping_path": os.path.join(MODELS_BASE_PATH, "corn", "corn_class_mapping.json")
    },
    "potato": {
        "model_path": os.path.join(MODELS_BASE_PATH, "potato", "best_potato_effnet.pth"),
        "mapping_path": os.path.join(MODELS_BASE_PATH, "potato", "potato_class_mapping.json")
    },
    "rice": {
        "model_path": os.path.join(MODELS_BASE_PATH, "rice", "best_rice_effnet.pth"),
        "mapping_path": os.path.join(MODELS_BASE_PATH, "rice", "rice_class_mapping.json")
    },
    "sugarcane": {
        "model_path": os.path.join(MODELS_BASE_PATH, "sugarcane", "best_sugarcane_effnet.pth"),
        "mapping_path": os.path.join(MODELS_BASE_PATH, "sugarcane", "sugarcane_class_mapping.json")
    },
    "wheat": {
        "model_path": os.path.join(MODELS_BASE_PATH, "wheat", "best_wheat_effnet.pth"),
        "mapping_path": os.path.join(MODELS_BASE_PATH, "wheat", "wheat_class_mapping.json")
    }
}

effnet_models = {}

def get_effnet_model(model_path, num_classes):
    if model_path not in effnet_models:
        if not os.path.exists(model_path):
            raise ValueError(f"Model path not found: {model_path}")
        print(f"Loading EfficientNet model from {model_path}")
        device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        model = efficientnet_b0(weights=None)
        num_ftrs = model.classifier[1].in_features
        model.classifier[1] = torch.nn.Linear(num_ftrs, num_classes)
        model.load_state_dict(torch.load(model_path, map_location=device, weights_only=True))
        model = model.to(device)
        model.eval()
        effnet_models[model_path] = (model, device)
    return effnet_models[model_path]

effnet_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# Cache for loaded models to avoid reloading
loaded_models = {}

def get_model(model_name):
    if model_name not in loaded_models:
        model_path = AVAILABLE_MODELS.get(model_name)
        if not model_path or not os.path.exists(model_path):
            raise ValueError(f"Model path not found: {model_path}")
        print(f"Loading model: {model_name} from {model_path}")
        loaded_models[model_name] = YOLO(model_path)
    return loaded_models[model_name]

def get_model_by_path(path):
    if path not in loaded_models:
        if not os.path.exists(path):
            raise ValueError(f"Model path not found: {path}")
        print(f"Loading model from {path}")
        loaded_models[path] = YOLO(path)
    return loaded_models[path]

@app.route('/')
def index():
    # Provide the model names (for UI info)
    models = list(AVAILABLE_MODELS.keys()) + ["Weed Detection & Classification"]
    return render_template('index.html', models=models)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    file = request.files['image']
    original_filename = file.filename if file.filename else "upload.jpg"
    base_name, ext = os.path.splitext(original_filename)

    # Ensure output directory exists (in All_Models/OUTPUT)
    output_dir = os.path.join(MODELS_BASE_PATH, 'OUTPUT')
    os.makedirs(output_dir, exist_ok=True)
    import time
    timestamp = int(time.time())

    try:
        # Read image
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        
        # OPTIMIZATION: Resize image if it's too large to save CPU and base64 encoding time
        max_dim = 800
        h, w = img.shape[:2]
        if max(h, w) > max_dim:
            scale = max_dim / max(h, w)
            img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)

        results_data = {}
        errors = {}

        # Run standard models
        for m_name in AVAILABLE_MODELS.keys():
            try:
                model = get_model(m_name)
                results = model(img)
                
                # Plot results
                annotated_img = results[0].plot()

                # Save the image to the output folder
                safe_m_name = m_name.replace(' ', '_')
                save_filename = f"{base_name}_{safe_m_name}_{timestamp}.jpg"
                save_path = os.path.join(output_dir, save_filename)
                cv2.imwrite(save_path, annotated_img)

                # Convert back to base64 for frontend display
                _, buffer = cv2.imencode('.jpg', annotated_img)
                img_base64 = base64.b64encode(buffer).decode('utf-8')
                
                results_data[m_name] = img_base64
            except Exception as e:
                print(f"Error running model {m_name}: {e}")
                import traceback
                traceback.print_exc()
                errors[m_name] = str(e)

        # Run Weed Pipeline
        try:
            det_model = get_model_by_path(WEED_DET_PATH)
            cls_model = get_model_by_path(WEED_CLS_PATH)
            
            weed_img = img.copy()
            det_results = det_model.predict(img, conf=0.25, verbose=False)
            boxes = det_results[0].boxes
            
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                crop_img = img[y1:y2, x1:x2]
                
                if crop_img.size == 0:
                    continue
                
                cls_results = cls_model.predict(crop_img, verbose=False)
                cls_result = cls_results[0]
                
                top_idx = cls_result.probs.top1
                raw_class_name = cls_result.names[top_idx]
                confidence = cls_result.probs.top1conf.item()
                
                if confidence < 0.60:
                    class_name = "Unclassified"
                    box_color = (255, 0, 0)
                else:
                    class_name = raw_class_name
                    box_color = (0, 255, 0)
                    
                cv2.rectangle(weed_img, (x1, y1), (x2, y2), box_color, 2)
                label = f"{class_name} {confidence:.2f}"
                (text_width, text_height), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
                cv2.rectangle(weed_img, (x1, y1 - text_height - 10), (x1 + text_width, y1), box_color, cv2.FILLED)
                text_color = (255, 255, 255) if class_name == "Unclassified" else (0, 0, 0)
                cv2.putText(weed_img, label, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, text_color, 1)

            # Save and encode
            safe_m_name = "Weed_Pipeline"
            save_filename = f"{base_name}_{safe_m_name}_{timestamp}.jpg"
            save_path = os.path.join(output_dir, save_filename)
            cv2.imwrite(save_path, weed_img)

            _, buffer = cv2.imencode('.jpg', weed_img)
            results_data["Weed Detection & Classification"] = base64.b64encode(buffer).decode('utf-8')
        except Exception as e:
            print(f"Error running Weed Pipeline: {e}")
            import traceback
            traceback.print_exc()
            errors["Weed Detection & Classification"] = str(e)

        return jsonify({
            "success": True,
            "images": results_data,
            "errors": errors
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# ── NEW: Per-model endpoints for the redesigned frontend ──────────────

@app.route('/predict/weed', methods=['POST'])
def predict_weed():
    """Run only the Weed Detection & Classification pipeline."""
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    original_filename = file.filename if file.filename else "upload.jpg"
    base_name, _ = os.path.splitext(original_filename)

    output_dir = os.path.join(MODELS_BASE_PATH, 'OUTPUT')
    os.makedirs(output_dir, exist_ok=True)
    import time
    timestamp = int(time.time())

    try:
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # OPTIMIZATION: Resize image
        max_dim = 800
        h, w = img.shape[:2]
        if max(h, w) > max_dim:
            scale = max_dim / max(h, w)
            img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)

        det_model = get_model_by_path(WEED_DET_PATH)
        cls_model = get_model_by_path(WEED_CLS_PATH)

        weed_img = img.copy()
        det_results = det_model.predict(img, conf=0.25, verbose=False)
        boxes = det_results[0].boxes

        detections = []

        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            crop_img = img[y1:y2, x1:x2]

            if crop_img.size == 0:
                continue

            cls_results = cls_model.predict(crop_img, verbose=False)
            cls_result = cls_results[0]

            top_idx = cls_result.probs.top1
            raw_class_name = cls_result.names[top_idx]
            confidence = cls_result.probs.top1conf.item()

            if confidence < 0.60:
                class_name = "Unclassified"
                box_color = (255, 0, 0)
            else:
                class_name = raw_class_name
                box_color = (0, 255, 0)

            detections.append({"label": class_name, "confidence": round(confidence, 4)})

            cv2.rectangle(weed_img, (x1, y1), (x2, y2), box_color, 2)
            label = f"{class_name} {confidence:.2f}"
            (text_width, text_height), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
            cv2.rectangle(weed_img, (x1, y1 - text_height - 10), (x1 + text_width, y1), box_color, cv2.FILLED)
            text_color = (255, 255, 255) if class_name == "Unclassified" else (0, 0, 0)
            cv2.putText(weed_img, label, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, text_color, 1)

        # Save
        save_path = os.path.join(output_dir, f"{base_name}_Weed_{timestamp}.jpg")
        cv2.imwrite(save_path, weed_img)

        _, buffer = cv2.imencode('.jpg', weed_img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        return jsonify({
            "success": True,
            "image": img_base64,
            "detections": detections,
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


@app.route('/predict/leaf', methods=['POST'])
def predict_leaf():
    """Run the Plant Disease classification/detection model."""
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    plant_type = request.form.get('plant', 'Unknown')
    original_filename = file.filename if file.filename else "upload.jpg"
    base_name, _ = os.path.splitext(original_filename)

    output_dir = os.path.join(MODELS_BASE_PATH, 'OUTPUT')
    os.makedirs(output_dir, exist_ok=True)
    import time
    timestamp = int(time.time())

    try:
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # OPTIMIZATION: Resize image
        max_dim = 800
        h, w = img.shape[:2]
        if max(h, w) > max_dim:
            scale = max_dim / max(h, w)
            img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)

        if '(pending)' in plant_type.lower():
            return jsonify({"error": f"Model for {plant_type} is currently pending and not available."}), 400

        if plant_type.lower() in EFFNET_CONFIG:
            plant_key = plant_type.lower()
            config = EFFNET_CONFIG[plant_key]
            
            with open(config["mapping_path"], "r") as f:
                class_mapping = json.load(f)
            num_classes = len(class_mapping)
            
            model, device = get_effnet_model(config["model_path"], num_classes)
            
            pil_img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
            input_tensor = effnet_transform(pil_img).unsqueeze(0).to(device)
            
            with torch.no_grad():
                outputs = model(input_tensor)
                probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
                conf, pred_class = torch.max(probabilities, 0)
                
            label = class_mapping[str(pred_class.item())]
            detections = [{"label": label, "confidence": round(conf.item(), 4)}]
            
            annotated_img = img.copy()
            # Draw a simple background box for text
            text = f"{label} {conf.item():.2f}"
            (text_width, text_height), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 1, 2)
            cv2.rectangle(annotated_img, (10, 10), (10 + text_width, 10 + text_height + 10), (0, 0, 0), -1)
            cv2.putText(annotated_img, text, (10, 10 + text_height + 5), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        else:
            if plant_type.lower() == 'tomato':
                model = get_model("Tomato Disease")
            else:
                model = get_model("Plant Disease")
            
            results = model(img)
            annotated_img = results[0].plot()

            # Extract detections
            detections = []
            result = results[0]

            # Handle detection model output (boxes)
            if result.boxes is not None and len(result.boxes) > 0:
                for box in result.boxes:
                    cls_id = int(box.cls[0])
                    conf = float(box.conf[0])
                    label = result.names[cls_id]
                    detections.append({"label": label, "confidence": round(conf, 4)})
            # Handle classification model output (probs)
            elif result.probs is not None:
                top_idx = result.probs.top1
                conf = result.probs.top1conf.item()
                label = result.names[top_idx]
                detections.append({"label": label, "confidence": round(conf, 4)})

        # Save
        save_path = os.path.join(output_dir, f"{base_name}_Leaf_{timestamp}.jpg")
        cv2.imwrite(save_path, annotated_img)

        _, buffer = cv2.imencode('.jpg', annotated_img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        return jsonify({
            "success": True,
            "image": img_base64,
            "detections": detections,
            "plant": plant_type,
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    print("Starting server. Please ensure you have flask and ultralytics installed.")
    app.run(debug=True, host='0.0.0.0', port=5000)
