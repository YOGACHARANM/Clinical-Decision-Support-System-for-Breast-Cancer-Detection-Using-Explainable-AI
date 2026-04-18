
# Data Processing
import pandas as pd
import numpy as np

# Machine Learning
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score
)

# Explainable AI
import shap
from lime import lime_tabular

# Model Persistence
import joblib
import json
from datetime import datetime
import os

# Warnings
import warnings
warnings.filterwarnings('ignore')

def train():
    print("Starting training process...")
    
    # Check if data exists
    if not os.path.exists('data/breast_cancer.csv'):
        print("Error: data/breast_cancer.csv not found.")
        return

    # Load Dataset
    df = pd.read_csv('data/breast_cancer.csv')
    df = df.drop(['id', 'Unnamed: 32'], axis=1, errors='ignore')

    # Define the 10 selected features
    SELECTED_FEATURES = [
        'concave points_worst',
        'texture_mean',
        'compactness_se',
        'perimeter_worst',
        'area_se',
        'texture_worst',
        'symmetry_worst',
        'compactness_mean',
        'concave points_mean',
        'smoothness_mean'
    ]

    X = df[SELECTED_FEATURES]
    y = df['diagnosis']

    # Encode target
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )

    # Feature scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Train AdaBoost
    base_estimator = DecisionTreeClassifier(max_depth=1, random_state=42)
    ada_model = AdaBoostClassifier(
        estimator=base_estimator,
        n_estimators=100,
        learning_rate=1.0,
        random_state=42
    )
    ada_model.fit(X_train_scaled, y_train)

    # Evaluation
    y_test_pred = ada_model.predict(X_test_scaled)
    test_accuracy = accuracy_score(y_test, y_test_pred)
    print(f"Model Accuracy: {test_accuracy*100:.2f}%")

    # Metrics
    precision = precision_score(y_test, y_test_pred)
    recall = recall_score(y_test, y_test_pred)
    f1 = f1_score(y_test, y_test_pred)
    
    # Initialize SHAP
    print("Initializing SHAP explainer...")
    explainer = shap.Explainer(ada_model.predict, X_train_scaled)
    # Trigger initial computation (optional but good for checking)
    # shap_values = explainer(X_test_scaled[:5])

    # Initialize LIME
    print("Initializing LIME explainer...")
    lime_explainer = lime_tabular.LimeTabularExplainer(
        training_data=X_train_scaled,
        feature_names=SELECTED_FEATURES,
        class_names=['Benign', 'Malignant'],
        mode='classification',
        random_state=42
    )

    # Save Models
    os.makedirs('models', exist_ok=True)
    
    joblib.dump(ada_model, 'models/adaboost_10features.pkl')
    joblib.dump(scaler, 'models/scaler_10features.pkl')
    joblib.dump(label_encoder, 'models/label_encoder.pkl')
    joblib.dump(explainer, 'models/shap_explainer.pkl')
    joblib.dump(X_train_scaled, 'models/X_train_scaled.pkl')
    # joblib.dump(lime_explainer, 'models/lime_explainer.pkl') # LIME cannot be pickled easily due to lambdas

    with open('models/feature_names.json', 'w') as f:
        json.dump(SELECTED_FEATURES, f)

    metadata = {
        'model_type': 'AdaBoost',
        'accuracy': float(test_accuracy),
        'precision': float(precision),
        'recall': float(recall),
        'f1_score': float(f1),
        'trained_date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    with open('models/model_metadata.json', 'w') as f:
        json.dump(metadata, f, indent=2)

    print("All models saved successfully.")

if __name__ == "__main__":
    train()
