# 🌿 AgriSense AI — Smart Agricultural Diagnostics & Recommendation Engine

**AgriSense AI** is an offline-capable, edge-ready artificial intelligence platform designed for real-time crop disease detection, weed classification, and localized agronomic decision support. Built specifically to operate in low-resource environments (such as handheld **Raspberry Pi** devices for farmers in **India**), AgriSense AI operates 100% offline with zero cloud dependency.

---

## ✨ Key Features

- 🔬 **Multi-Crop Disease Detection**: Instant disease diagnosis for 6 major crops:
  - 🌽 **Corn / Maize**: Common Rust, Gray Leaf Spot, Northern Leaf Blight, Healthy
  - 🥔 **Potato**: Early Blight, Late Blight, Healthy
  - 🌾 **Rice**: Brown Spot, Leaf Blast, Neck Blast, Healthy
  - 🎋 **Sugarcane**: Bacterial Blight, Mosaic, Red Rot, Rust, Yellow Leaf, Healthy
  - 🌾 **Wheat**: Brown Rust, Yellow Rust, Healthy
  - 🍅 **Tomato**: Early Blight, Late Blight, Bacterial Spot, Leaf Mold, Leaf Miner, Mosaic Virus, Septoria, Spider Mites, Yellow Leaf Curl Virus, Healthy
- 🌿 **Weed Detection & Management Pipeline**: Automated bounding-box localization, classification, and agronomic management across 16 major Indian weed species:
  - *Lavhala (Nutgrass)*, *Gajar Gavat (Congress Grass)*, *Harali (Bermuda Grass)*, *Kena (Benghal Dayflower)*, *Bathua (Lamb's Quarters)*, *Sicklepod (Takla)*, *Satyanashi (Mexican Poppy)*, *Moti Dudhi*, *Choti Dudhi*, *Obscure Morning Glory*, *Little Mallow*, *Graceful Sandmat*, *Dwarf Cassia*, *Punarnava*, *Asian Pigeonwings (Gokarna)*, *Digitaria (Crabgrass)*.
- 💡 **Offline Recommendation Engine**: 
  - $O(1)$ memory-mapped rule-based expert system tailored for Indian agricultural regions (Maharashtra, Punjab, Haryana, Gujarat).
  - Displays **Severity Levels**, **Visual Symptoms**, **Chemical Control** (popular Indian brands like *Roundup*, *Sempra*, *2,4-D*, *Targa Super*, *Dithane M-45*, *Bavistin*, *Tilt*, *Blitox 50*), **Organic/Cultural Methods** (*Summer Solarization*, *Biological beetles*, *Zygogramma*, *Neem Oil*, *Trichoderma*), and **Preventative Measures**.
- 📄 **Offline Report Generator**: Generates and downloads self-contained, printable HTML diagnostic reports with embedded high-resolution analysis images and agronomic action plans.

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────┐
│              AgriSense AI Web UI (React/Vite)           │
└────────────────────────────┬────────────────────────────┘
                             │ REST API (localhost:5000)
┌────────────────────────────▼────────────────────────────┐
│                  Flask Backend (app.py)                 │
├────────────────────────────┬────────────────────────────┤
│  PyTorch / EfficientNet    │      Ultralytics YOLO      │
│   (Crop Classifiers)       │   (Tomato & Weed Detector) │
└────────────────────────────┴────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────┐
│      Offline Knowledge Base (disease_recommendations.json) │
└─────────────────────────────────────────────────────────┘
```

- **Frontend**: React 18, Vite, Vanilla Glassmorphic CSS, Lucide Icons.
- **Backend**: Python 3.10+, Flask, Flask-CORS, PyTorch, Torchvision, Ultralytics YOLOv8, OpenCV.
- **Data Store**: Structured JSON Knowledge Base (`ai-model/disease_recommendations.json`).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### 1. Backend Setup
```bash
# Navigate to the ai-model directory
cd ai-model

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask inference server
python app.py
```
*The Flask server will start on `http://127.0.0.1:5000`.*

### 2. Frontend Setup
```bash
# From the project root directory
npm install

# Start the Vite development server
npm run dev
```
*Open your browser and navigate to `http://localhost:5173/`.*

---

## 🛠️ Project Structure

```text
AgriSense-AI/
├── ai-model/                      # Python ML Backend & Models
│   ├── app.py                     # Flask API & Inference Pipeline
│   ├── disease_recommendations.json # Offline Indian Agronomic Knowledge Base
│   ├── corn/                      # EfficientNet-B0 Corn model & mapping
│   ├── potato/                    # EfficientNet-B0 Potato model & mapping
│   ├── rice/                      # EfficientNet-B0 Rice model & mapping
│   ├── sugarcane/                 # EfficientNet-B0 Sugarcane model & mapping
│   ├── wheat/                     # EfficientNet-B0 Wheat model & mapping
│   ├── tomato/                    # YOLOv8 Tomato disease model
│   └── Weed_Type/                 # YOLOv8 Weed detection & classifier
├── src/                           # React Frontend Application
│   ├── pages/                     # Application Pages (DiseaseDetection, Home, etc.)
│   ├── components/                # Modular UI Components
│   └── index.css                  # Modern Design Tokens & Utilities
├── vite.config.js                 # Vite Proxy & Server Configuration
└── README.md                      # Project Documentation
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
