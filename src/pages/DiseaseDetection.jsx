import React, { useState, useRef } from 'react';
import './DiseaseDetection.css';

const DiseaseDetection = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [errors, setErrors] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }
        setSelectedFile(file);
        setResults(null);
        setErrors(null);
        
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);
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

    const runAnalysis = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            // Using Vite proxy to avoid CORS issues
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setResults(data.images);
                setErrors(data.errors);
            } else {
                alert('Error: ' + (data.error || 'Failed to process image'));
            }
        } catch (err) {
            alert('Network error occurred. Ensure the AI model server is running on port 5000.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="disease-detection-container">
            <header className="detection-header">
                <h1>AI Pathology Diagnostics</h1>
                <p>Upload a leaf image for immediate disease analysis using our AI models</p>
            </header>

            <div className="detection-panel">
                <div className="control-group">
                    <div className="upload-section">
                        <label>Upload Sample Image</label>
                        <div 
                            className="upload-area"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                        >
                            <p>Click to browse or drag and drop image here</p>
                            <p className="upload-hint">Supports JPG, PNG</p>
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>

                    <button 
                        className="analyze-btn" 
                        disabled={!selectedFile || isLoading}
                        onClick={runAnalysis}
                    >
                        {isLoading ? <div className="loader"></div> : 'Run Analysis'}
                    </button>
                </div>

                <div className="result-section">
                    <h3>Analysis Results</h3>
                    <div className="preview-container">
                        {!previewUrl && (
                            <span className="empty-state">No image uploaded yet.</span>
                        )}
                        
                        {previewUrl && (
                            <div className="result-item">
                                <h4>Original Image</h4>
                                <img src={previewUrl} alt="Original" />
                            </div>
                        )}

                        {isLoading && (
                            <span className="empty-state loading-text">Analyzing with all models...</span>
                        )}

                        {results && Object.entries(results).map(([modelName, base64Img]) => (
                            <div className="result-item" key={modelName}>
                                <h4>{modelName}</h4>
                                <img src={`data:image/jpeg;base64,${base64Img}`} alt={`${modelName} Result`} />
                            </div>
                        ))}

                        {errors && Object.entries(errors).map(([modelName, errorMsg]) => (
                            <div className="result-item error-item" key={modelName}>
                                <h4>{modelName} (Error)</h4>
                                <p>Failed to run model.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetection;
