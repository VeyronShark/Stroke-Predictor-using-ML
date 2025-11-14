from flask import Flask, request, jsonify
import pandas as pd
from joblib import load
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()
CLIENT_URL = os.getenv('CLIENT_URL') or 'http;//localhost:5173'

model = load('./stroke_prediction_model.joblib')

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": CLIENT_URL,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

@app.route('/predict', methods=['POST'])
def predict():
  try:
    data = request.json
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]
    prediction_proba = model.predict_proba(df)[0]
    print(f"prediction: {prediction}")

    return jsonify({
        'prediction': int(prediction),
        'probability': float(prediction_proba[1])
    }), 200
  except Exception as e:
    print(f"Error: {str(e)}")
    return jsonify({'error': str(e)}), 500

@app.route('/')
def home():
  return "Stroke Prediction API is running."

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)