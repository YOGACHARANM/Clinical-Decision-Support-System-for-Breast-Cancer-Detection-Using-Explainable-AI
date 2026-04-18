import joblib
import numpy as np
import json
import shap
from lime import lime_tabular
from datetime import datetime

# Global loaded models (cache)
models_cache = {}

def load_models():
    if not models_cache:
        models_cache['ada_model'] = joblib.load('models/adaboost_10features.pkl')
        models_cache['scaler'] = joblib.load('models/scaler_10features.pkl')
        models_cache['label_encoder'] = joblib.load('models/label_encoder.pkl')
        models_cache['explainer'] = joblib.load('models/shap_explainer.pkl')
        models_cache['X_train_scaled'] = joblib.load('models/X_train_scaled.pkl')
        
        with open('models/feature_names.json', 'r') as f:
            models_cache['feature_names'] = json.load(f)
            
    return models_cache

def predict_with_xai(features_dict, doctor_notes=""):
    models = load_models()
    ada_model = models['ada_model']
    scaler = models['scaler']
    label_encoder = models['label_encoder']
    explainer = models['explainer']
    X_train_scaled = models['X_train_scaled']
    feature_names = models['feature_names']
    
    # Prepare features
    features_array = np.array([
        features_dict.get(feat, 0) for feat in feature_names
    ]).reshape(1, -1)
    
    features_scaled = scaler.transform(features_array)
    
    # Prediction
    prediction = ada_model.predict(features_scaled)[0]
    probabilities = ada_model.predict_proba(features_scaled)[0]
    prediction_label = label_encoder.inverse_transform([prediction])[0]
    confidence = float(probabilities[prediction])
    
    # Determination
    if prediction_label == 'B':
        result_text = "BENIGN"
        risk_level = "Low Risk"
        risk_color = "#10B981"
    else:
        result_text = "MALIGNANT"
        if confidence > 0.90:
            risk_level = "High Risk"
            risk_color = "#EF4444"
        elif confidence > 0.75:
            risk_level = "Moderate-High Risk"
            risk_color = "#F59E0B"
        else:
            risk_level = "Moderate Risk"
            risk_color = "#F59E0B"

    # SHAP
    shap_values_result = explainer(features_scaled)
    shap_vals = shap_values_result.values[0]
    
    shap_contributions = []
    for i, feat_name in enumerate(feature_names):
        shap_contributions.append({
            'feature': feat_name,
            'value': float(features_dict.get(feat_name, 0)),
            'shap_value': float(shap_vals[i]),
            'contribution': 'Increases Risk' if shap_vals[i] > 0 else 'Decreases Risk'
        })
    shap_contributions.sort(key=lambda x: abs(x['shap_value']), reverse=True)
    top_features = shap_contributions[:5]
    
    # Initialize LIME dynamically
    lime_explainer = lime_tabular.LimeTabularExplainer(
        training_data=X_train_scaled,
        feature_names=feature_names,
        class_names=['Benign', 'Malignant'],
        mode='classification',
        random_state=42
    )

    # LIME Explanation
    lime_exp = lime_explainer.explain_instance(
        features_scaled[0],
        ada_model.predict_proba,
        num_features=5
    )
    lime_list = lime_exp.as_list()
    lime_explanations = []
    for rule, weight in lime_list:
        lime_explanations.append({
            'rule': rule,
            'weight': float(weight),
            'impact': 'Supports Malignancy' if weight > 0 else 'Supports Benign'
        })

    # Suggestions logic placeholder (simplified from prompt for brevity in this step)
    suggestions = generate_suggestions(prediction_label, shap_contributions, confidence)

    return {
        'prediction': result_text,
        'confidence': confidence,
        'risk_level': risk_level,
        'risk_color': risk_color,
        'shap_analysis': {
            'base_value': float(shap_values_result.base_values[0]),
            'prediction_value': float(shap_values_result.base_values[0] + shap_vals.sum()),
            'top_features': top_features
        },
        'lime_analysis': {
            'explanations': lime_explanations
        },
        'clinical_suggestions': suggestions,
        'doctor_notes': doctor_notes,
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }

def generate_suggestions(label, shap_contributions, confidence):
    # Logic similar to doc provided
    if label == 'M':
        return {
            'immediate_action': ["Consult Oncologist", "Biopsy Confirmation"],
            'recommended_tests': ["MRI", "Ultrasound"],
            'specialist_referral': ["Surgical Oncologist"],
            'risk_factors': [c['feature'] for c in shap_contributions if c['shap_value'] > 0.05]
        }
    else:
        return {
            'immediate_action': ["Regular Screening"],
            'recommended_tests': ["Mammogram in 6 months"],
            'specialist_referral': ["Primary Care"],
            'protective_factors': [c['feature'] for c in shap_contributions if c['shap_value'] < -0.05]
        }
