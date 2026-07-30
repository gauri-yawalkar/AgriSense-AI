import os
import cv2
import base64
import numpy as np
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

# Base path for models relative to this script (app.py is now in All_Models folder)
MODELS_BASE_PATH = os.path.dirname(os.path.abspath(__file__))

# Available models mapping for standard inference
AVAILABLE_MODELS = {
    "Crop vs Weed": os.path.join(MODELS_BASE_PATH, "crop-weed", "best.pt"),
    "Plant Disease": os.path.join(MODELS_BASE_PATH, "plant-disease-classification-detection", "best.pt"),
    "Crop Detection": os.path.join(MODELS_BASE_PATH, "crop-detection", "yolov8n.pt"),
}

# Weed pipeline models
WEED_DET_PATH = os.path.join(MODELS_BASE_PATH, "Weed_Type", "best_model.pt")
WEED_CLS_PATH = os.path.join(MODELS_BASE_PATH, "Weed_Type", "weed_cls_model.pt")

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
