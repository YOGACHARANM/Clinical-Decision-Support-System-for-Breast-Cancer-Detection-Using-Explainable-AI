import pandas as pd
import json
import sys
import os

# Add current directory to path so we can import app modules
sys.path.append(os.getcwd())

from app.prediction import predict_with_xai

def verify_model():
    print("Loading dataset...")
    df = pd.read_csv('data/breast_cancer.csv')
    
    # Load features
    with open('models/feature_names.json', 'r') as f:
        feature_names = json.load(f)
        
    print(f"Testing with features: {feature_names}")
    
    # Select random samples: 3 Benign, 3 Malignant
    benign_samples = df[df['diagnosis'] == 'B'].sample(3, random_state=42)
    malignant_samples = df[df['diagnosis'] == 'M'].sample(3, random_state=42)
    
    samples = pd.concat([benign_samples, malignant_samples])
    
    correct = 0
    total = len(samples)
    
    print("\n--- Model Verification Results ---\n")
    
    for idx, row in samples.iterrows():
        input_data = {feat: row[feat] for feat in feature_names}
        actual = "BENIGN" if row['diagnosis'] == 'B' else "MALIGNANT"
        
        # Run prediction via application logic
        try:
            result = predict_with_xai(input_data)
            predicted = result['prediction']
            confidence = result['confidence']
            
            is_correct = (predicted == actual)
            if is_correct: correct += 1
            
            status = "✅ PASS" if is_correct else "❌ FAIL"
            
            print(f"Sample ID: {row['id']} | Actual: {actual} | Predicted: {predicted} ({confidence:.2f}) | {status}")
            
            # Print brief explanation check
            top_feature = result['shap_analysis']['top_features'][0]
            print(f"   Top Risk Factor: {top_feature['feature']} (SHAP: {top_feature['shap_value']:.4f})")
            
        except Exception as e:
            print(f"Sample ID: {row['id']} | Error: {str(e)}")
            
    print(f"\nAccuracy on samples: {correct}/{total} ({(correct/total)*100:.1f}%)")

if __name__ == "__main__":
    verify_model()
