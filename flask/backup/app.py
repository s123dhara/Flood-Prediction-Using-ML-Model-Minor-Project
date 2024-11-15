from flask import Flask, request, jsonify
import pickle
import pandas as pd
from dotenv import load_dotenv
import os


# Load environment variables from .env file
load_dotenv()

# Get the PORT from the .env file, with a default fallback
flask_PORT = int(os.getenv("ML_PORT", 5000))

# Load the trained model and label encoder
with open('flood_prediction_model.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

with open('label_encoder.pkl', 'rb') as le_file:
    loaded_le = pickle.load(le_file)

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("FROM FLASK API ",data)
    # Extract subdivision and rainfall data from the request
    subdivision = data['subdivision']
    rainfall = data['rainfall']

    # Create a DataFrame for prediction
    new_data = pd.DataFrame({
        "SUBDIVISION": loaded_le.transform([subdivision]),
        "JAN": [rainfall['jan']],
        "FEB": [rainfall['feb']],
        "MAR": [rainfall['mar']],
        "APR": [rainfall['apr']],
        "MAY": [rainfall['may']],
        "JUN": [rainfall['jun']],
        "JUL": [rainfall['jul']],
        "AUG": [rainfall['aug']],
        "SEP": [rainfall['sep']],
        "OCT": [rainfall['oct']],
        "NOV": [rainfall['nov']],
        "DEC": [rainfall['dec']]
    })
    
    # Make prediction
    prediction = loaded_model.predict(new_data)[0]
    prob_flood = loaded_model.predict_proba(new_data)[0][1]

    # Create the result response
    result = {
        "prediction": "Flood predicted" if prediction == 1 else "No flood predicted",
        "probability": prob_flood * 100
    }
    print("FROM FLASK API ",data)
    return jsonify(result)

if __name__ == '__main__':
    print("Server is running of flask")
    app.run(host='0.0.0.0', port=flask_PORT) 
