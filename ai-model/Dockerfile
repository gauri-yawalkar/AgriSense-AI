FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install system dependencies required for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application, including the models folder
COPY . .

# Create the OUTPUT directory and ensure it has write permissions
RUN mkdir -p OUTPUT && chmod 777 OUTPUT

# Create a non-root user (Hugging Face Spaces requirement/best practice)
RUN useradd -m -u 1000 user
USER user

# Hugging Face Spaces exposes port 7860
EXPOSE 7860

# Run the app with Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:7860", "--timeout", "120", "--workers", "1", "--threads", "2", "app:app"]
