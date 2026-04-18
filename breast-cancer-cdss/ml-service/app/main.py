from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import joblib

app = Flask(__name__)
CORS(app)

# Import prediction logic
try:
    from prediction import predict_with_xai
except ImportError:
    # Handle case if running from different dir
    from app.prediction import predict_with_xai

@app.route('/health', methods=['GET'])
def health_check():
    status = {'status': 'healthy'}
    if os.path.exists('models/model_metadata.json'):
        with open('models/model_metadata.json', 'r') as f:
            status.update(json.load(f))
    else:
        status['model_loaded'] = False
    return jsonify(status)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        if 'features' not in data:
            return jsonify({'success': False, 'error': 'Missing features'}), 400
        
        result = predict_with_xai(data['features'], data.get('doctorNotes', ''))
        result['patientId'] = data.get('patientId', 'Unknown')
        
        return jsonify({'success': True, 'data': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
