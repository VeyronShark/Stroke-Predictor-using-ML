from flask import Flask, request, jsonify, send_from_directory
import pandas as pd
from joblib import load
from flask_cors import CORS

model = load('./stroke_prediction_model.joblib')

app = Flask(__name__, static_folder='../frontend/dist', static_url_path="/")
CORS(app, resources={
    r"/*": {
        "origins": "*",
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
  return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
  app.run()