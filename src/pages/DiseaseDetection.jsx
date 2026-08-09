import React, { useState, useRef } from 'react';
import PageTransition from '../components/PageTransition';
import { UploadCloud, Activity, ImageIcon, AlertCircle, CheckCircle2, Leaf, Bug, ArrowLeft, Download, RotateCcw, ChevronRight } from 'lucide-react';
import './DiseaseDetection.css';

const PLANT_OPTIONS = [
    { id: 'tomato', name: 'Tomato', emoji: '🍅', isPending: false },
    { id: 'corn', name: 'Corn', emoji: '🌽', isPending: false },
    { id: 'potato', name: 'Potato', emoji: '🥔', isPending: false },
    { id: 'rice', name: 'Rice', emoji: '🌾', isPending: false },
    { id: 'sugarcane', name: 'Sugarcane', emoji: '🎋', isPending: false },
    { id: 'wheat', name: 'Wheat', emoji: '🌾', isPending: false },
    { id: 'cotton', name: 'Cotton', emoji: '🌿', isPending: true },
    { id: 'chillies', name: 'Chillies', emoji: '🌶️', isPending: true },
];

const DiseaseDetection = () => {
    // Wizard state
    const [mode, setMode] = useState(null);          // null | 'weed' | 'leaf'
    const [selectedPlant, setSelectedPlant] = useState(null); // for leaf mode
    const [step, setStep] = useState('choose');       // 'choose' | 'plant' | 'upload' | 'results'

    // File & analysis state
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [resultImage, setResultImage] = useState(null);
    const [detections, setDetections] = useState([]);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const resetAll = () => {
        setMode(null);
        setSelectedPlant(null);
        setStep('choose');
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsLoading(false);
        setResultImage(null);
        setDetections([]);
        setError(null);
    };

    const handleModeSelect = (selectedMode) => {
        setMode(selectedMode);
        if (selectedMode === 'weed') {
            setStep('upload');
        } else {
            setStep('plant');
        }
    };

    const handlePlantSelect = (plant) => {
        if (plant.isPending) {
            setError(`The model for ${plant.name} is currently coming soon in an upcoming update.`);
            return;
        }
        setSelectedPlant(plant);
        setStep('upload');
    };

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }
        setSelectedFile(file);
        setError(null);

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);

        // Auto-start analysis
        runAnalysis(file);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const runAnalysis = async (file) => {
        setIsLoading(true);
        setStep('results');
        const formData = new FormData();
        formData.append('image', file);

        if (mode === 'leaf' && selectedPlant) {
            formData.append('plant', selectedPlant.name);
        }

        // Read from Vercel Environment Variables in Production, else use empty string (proxy)
        const baseUrl = import.meta.env.PROD ? (import.meta.env.VITE_API_BASE_URL || '') : '';
        const endpoint = mode === 'weed' ? `${baseUrl}/predict/weed` : `${baseUrl}/predict/leaf`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setResultImage(data.image);
                setDetections(data.detections || []);
            } else {
                setError(data.error || 'Failed to process image');
            }
        } catch (err) {
            setError('Network error. Ensure the AI model server is running on port 5000.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const generateReport = () => {
        const timestamp = new Date().toLocaleString();
        const analysisType = mode === 'weed' ? 'Weed Detection & Classification' : 'Leaf Analysis & Disease Prediction';
        const plantInfo = mode === 'leaf' && selectedPlant ? `<tr><td style="padding:8px 16px;font-weight:600;color:#4a5568;">Plant</td><td style="padding:8px 16px;color:#1a202c;">${selectedPlant.name}</td></tr>` : '';

        const detectionsRows = detections.map((d, i) =>
            `<tr style="background:${i % 2 === 0 ? '#f7faf8' : '#ffffff'}">
                <td style="padding:10px 16px;color:#1a202c;">${d.label}</td>
                <td style="padding:10px 16px;color:#1a202c;">${(d.confidence * 100).toFixed(1)}%</td>
            </tr>`
        ).join('');

        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgriSense AI — Analysis Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a202c; background: #f0f4f0; }
        .report { max-width: 800px; margin: 2rem auto; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
        .header { background: linear-gradient(135deg, #00994d, #07753e); color: white; padding: 2rem; text-align: center; }
        .header h1 { font-size: 1.8rem; margin-bottom: 0.25rem; }
        .header p { opacity: 0.85; font-size: 0.95rem; }
        .body { padding: 2rem; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
        .meta-table td { padding: 8px 16px; border-bottom: 1px solid #e2e8f0; }
        .images { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
        .images div { text-align: center; }
        .images h3 { font-size: 1rem; margin-bottom: 0.75rem; color: #4a5568; }
        .images img { width: 100%; border-radius: 8px; border: 1px solid #e2e8f0; }
        .detections h2 { font-size: 1.2rem; margin-bottom: 1rem; color: #00994d; }
        .det-table { width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
        .det-table th { background: #00994d; color: white; padding: 10px 16px; text-align: left; font-weight: 600; }
        .det-table td { padding: 10px 16px; border-bottom: 1px solid #e2e8f0; }
        .footer { text-align: center; padding: 1.5rem; color: #718096; font-size: 0.85rem; border-top: 1px solid #e2e8f0; }
        @media (max-width: 600px) { .images { grid-template-columns: 1fr; } }
        @media print { body { background: white; } .report { box-shadow: none; margin: 0; } }
    </style>
</head>
<body>
    <div class="report">
        <div class="header">
            <h1>🌿 AgriSense AI — Analysis Report</h1>
            <p>${analysisType}</p>
        </div>
        <div class="body">
            <table class="meta-table">
                <tr><td style="padding:8px 16px;font-weight:600;color:#4a5568;">Analysis Type</td><td style="padding:8px 16px;color:#1a202c;">${analysisType}</td></tr>
                ${plantInfo}
                <tr><td style="padding:8px 16px;font-weight:600;color:#4a5568;">Timestamp</td><td style="padding:8px 16px;color:#1a202c;">${timestamp}</td></tr>
                <tr><td style="padding:8px 16px;font-weight:600;color:#4a5568;">File</td><td style="padding:8px 16px;color:#1a202c;">${selectedFile?.name || 'N/A'}</td></tr>
            </table>

            <div class="images">
                <div>
                    <h3>Original Image</h3>
                    <img src="${previewUrl}" alt="Original" />
                </div>
                <div>
                    <h3>AI Analysis Output</h3>
                    <img src="data:image/jpeg;base64,${resultImage}" alt="Annotated" />
                </div>
            </div>

            <div class="detections">
                <h2>Detections</h2>
                ${detections.length > 0 ? `
                <table class="det-table">
                    <thead><tr><th>Label</th><th>Confidence</th></tr></thead>
                    <tbody>${detectionsRows}</tbody>
                </table>` : '<p style="color:#718096;">No detections found in this image.</p>'}
            </div>
        </div>
        <div class="footer">
            Generated by AgriSense AI &bull; ${timestamp}
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `AgriSense_Report_${mode}_${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // ── Step indicator ──
    const getSteps = () => {
        if (mode === 'weed') return ['Choose Type', 'Upload Image', 'Results'];
        if (mode === 'leaf') return ['Choose Type', 'Select Plant', 'Upload Image', 'Results'];
        return ['Choose Type'];
    };

    const getCurrentStepIndex = () => {
        if (step === 'choose') return 0;
        if (mode === 'weed') {
            if (step === 'upload') return 1;
            if (step === 'results') return 2;
        }
        if (mode === 'leaf') {
            if (step === 'plant') return 1;
            if (step === 'upload') return 2;
            if (step === 'results') return 3;
        }
        return 0;
    };

    const goBack = () => {
        if (step === 'results') {
            setResultImage(null);
            setDetections([]);
            setError(null);
            setSelectedFile(null);
            setPreviewUrl(null);
            setStep('upload');
        } else if (step === 'upload') {
            if (mode === 'leaf') {
                setSelectedPlant(null);
                setStep('plant');
            } else {
                resetAll();
            }
        } else if (step === 'plant') {
            resetAll();
        }
    };

    return (
        <PageTransition>
            <section className="section disease-detection-section">
                <div className="container disease-detection-container">
                    <header className="detection-header">
                        <h2><span className="text-gradient">AI Pathology</span> Diagnostics</h2>
                        <p>Select an analysis type and upload an image for instant AI-powered results</p>
                    </header>

                    {/* Step Indicator */}
                    {mode && (
                        <div className="step-indicator">
                            {getSteps().map((label, i) => (
                                <div key={label} className={`step-item ${i <= getCurrentStepIndex() ? 'active' : ''} ${i === getCurrentStepIndex() ? 'current' : ''}`}>
                                    <div className="step-dot">{i < getCurrentStepIndex() ? <CheckCircle2 size={16} /> : i + 1}</div>
                                    <span className="step-label">{label}</span>
                                    {i < getSteps().length - 1 && <ChevronRight size={16} className="step-separator" />}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Step: Choose Mode ── */}
                    {step === 'choose' && (
                        <div className="mode-selection">
                            <div className="glass-panel mode-card" onClick={() => handleModeSelect('weed')}>
                                <div className="mode-icon weed-icon">
                                    <Bug size={40} />
                                </div>
                                <h3>Weed Detection & Classification</h3>
                                <p>Identify and classify weeds in your field images using our AI detection pipeline</p>
                                <span className="mode-action btn btn-primary">
                                    Get Started <ChevronRight size={18} />
                                </span>
                            </div>

                            <div className="glass-panel mode-card" onClick={() => handleModeSelect('leaf')}>
                                <div className="mode-icon leaf-icon">
                                    <Leaf size={40} />
                                </div>
                                <h3>Leaf Analysis & Disease Prediction</h3>
                                <p>Analyze crop leaves to detect diseases and get predictions for treatment</p>
                                <span className="mode-action btn btn-primary">
                                    Get Started <ChevronRight size={18} />
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ── Step: Plant Selection (Leaf mode only) ── */}
                    {step === 'plant' && (
                        <div className="glass-panel plant-selection-panel">
                            <button className="back-btn" onClick={goBack}>
                                <ArrowLeft size={18} /> Back
                            </button>
                            <h3>Select Your Crop</h3>
                            <p className="plant-subtitle">Choose the plant type you want to analyze</p>
                            <div className="plant-grid">
                                {PLANT_OPTIONS.map((plant) => (
                                    <div 
                                        key={plant.id} 
                                        className={`plant-card ${plant.isPending ? 'pending-card' : ''}`} 
                                        onClick={() => handlePlantSelect(plant)}
                                        title={plant.isPending ? `${plant.name} model coming soon` : `Analyze ${plant.name}`}
                                    >
                                        <span className="plant-emoji">{plant.emoji}</span>
                                        <span className="plant-name">
                                            {plant.name}
                                            {plant.isPending && <span className="pending-badge">Soon</span>}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── Step: Upload ── */}
                    {step === 'upload' && (
                        <div className="glass-panel upload-panel">
                            <button className="back-btn" onClick={goBack}>
                                <ArrowLeft size={18} /> Back
                            </button>
                            {mode === 'leaf' && selectedPlant && (
                                <div className="selected-plant-badge">
                                    <span>{selectedPlant.emoji}</span> Analyzing: <strong>{selectedPlant.name}</strong>
                                </div>
                            )}
                            <div className="upload-section">
                                <label>Upload {mode === 'weed' ? 'Field' : 'Leaf'} Image</label>
                                <div
                                    className={`upload-area ${selectedFile ? 'has-file' : ''}`}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    {selectedFile ? (
                                        <CheckCircle2 size={48} className="upload-icon success" />
                                    ) : (
                                        <UploadCloud size={48} className="upload-icon" />
                                    )}
                                    <p>{selectedFile ? selectedFile.name : 'Click to browse or drag and drop image here'}</p>
                                    <p className="upload-hint">Supports JPG, PNG</p>
                                    {mode === 'leaf' && !selectedFile && (
                                        <p className="upload-tip">📸 Take a closer picture of the leaf only for best results</p>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* ── Step: Results ── */}
                    {step === 'results' && (
                        <div className="results-container">
                            {/* Loading */}
                            {isLoading && (
                                <div className="glass-panel loading-panel">
                                    <div className="loader lg"></div>
                                    <p className="loading-text">
                                        {mode === 'weed' ? 'Detecting and classifying weeds...' : `Analyzing ${selectedPlant?.name || ''} leaf for diseases...`}
                                    </p>
                                </div>
                            )}

                            {/* Error */}
                            {error && !isLoading && (
                                <div className="glass-panel error-panel">
                                    <AlertCircle size={48} className="error-icon" />
                                    <h3>Analysis Failed</h3>
                                    <p>{error}</p>
                                    <button className="btn btn-primary" onClick={resetAll}>
                                        <RotateCcw size={18} /> Try Again
                                    </button>
                                </div>
                            )}

                            {/* Success */}
                            {resultImage && !isLoading && (
                                <>
                                    <div className="results-images">
                                        <div className="glass-panel result-card">
                                            <h4>Original Image</h4>
                                            <div className="image-wrapper">
                                                <img src={previewUrl} alt="Original" />
                                            </div>
                                        </div>
                                        <div className="glass-panel result-card">
                                            <h4>AI Analysis Output</h4>
                                            <div className="image-wrapper">
                                                <img src={`data:image/jpeg;base64,${resultImage}`} alt="Annotated" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Conclusion */}
                                    <div className="glass-panel conclusion-panel">
                                        <h3>
                                            <CheckCircle2 size={22} className="conclusion-icon" />
                                            Analysis Conclusion
                                        </h3>
                                        {mode === 'leaf' && selectedPlant && (
                                            <p className="conclusion-meta">Plant: <strong>{selectedPlant.name}</strong></p>
                                        )}

                                        {detections.length > 0 ? (
                                            <div className="detections-list">
                                                <div className="detection-header-row">
                                                    <span>Detection</span>
                                                    <span>Confidence</span>
                                                </div>
                                                {detections.map((d, i) => (
                                                    <div key={i} className="detection-row">
                                                        <span className="detection-label">{d.label}</span>
                                                        <span className="detection-confidence">
                                                            <span className="conf-bar" style={{ width: `${d.confidence * 100}%` }}></span>
                                                            {(d.confidence * 100).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="no-detections">No detections found in this image.</p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="result-actions">
                                        <button className="btn btn-secondary" onClick={generateReport}>
                                            <Download size={18} /> Download Report
                                        </button>
                                        <button className="btn btn-primary" onClick={resetAll}>
                                            <RotateCcw size={18} /> Start Over
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </PageTransition>
    );
};

export default DiseaseDetection;
