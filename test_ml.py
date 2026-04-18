import requests
import json

url = "http://localhost:5000/predict"
data = {
    "features": {
        "concave points_worst": 0.2654,
        "texture_mean": 17.99,
        "compactness_se": 0.0490,
        "perimeter_worst": 184.6,
        "area_se": 153.4,
        "texture_worst": 17.33,
        "symmetry_worst": 0.4601,
        "compactness_mean": 0.2776,
        "concave points_mean": 0.1471,
        "smoothness_mean": 0.1184
    },
    "doctorNotes": "Test prediction"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")
