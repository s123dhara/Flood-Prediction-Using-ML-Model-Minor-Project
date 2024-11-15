from flask import Blueprint, request, jsonify
from models.flood_model import predict_flood

# Define a Flask blueprint for the prediction route
prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("FROM FLASK API", data)
        
        # Extract subdivision and rainfall data
        subdivision = data['subdivision']
        rainfall = data['rainfall']
        
        # Make prediction using the model
        result = predict_flood(subdivision, rainfall)
        
        # Return the result as JSON
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
