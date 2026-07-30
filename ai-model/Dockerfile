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

# Standard port for web services, but Render will override this with the PORT environment variable
ENV PORT=10000
EXPOSE $PORT

# Run the app with Gunicorn, binding to the PORT environment variable
CMD gunicorn -b 0.0.0.0:$PORT --timeout 120 --workers 1 --threads 2 app:app
