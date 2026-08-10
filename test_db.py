import os
import json

MODELS_BASE_PATH = os.path.dirname(os.path.abspath('ai-model/app.py'))
RECOMMENDATIONS_DB_PATH = os.path.join(MODELS_BASE_PATH, "disease_recommendations.json")

try:
    with open(RECOMMENDATIONS_DB_PATH, "r") as f:
        recommendations_db = json.load(f)
        print("Loaded keys:", len(recommendations_db))
except Exception as e:
    print("Error:", e)
