@echo off
echo Installing Dependencies...
pip install pandas numpy scikit-learn shap lime flask flask-cors joblib
echo.
echo Training Model...
python train_model.py
pause
