import pickle
import pandas as pd

# Load the trained model and label encoder
with open('models/flood_prediction_model.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

with open('models/label_encoder.pkl', 'rb') as le_file:
    loaded_le = pickle.load(le_file)

def predict_flood(subdivision, rainfall):
    """
    Predicts whether a flood will occur based on the given inputs.

    Args:
        subdivision (str): Name of the subdivision.
        rainfall (dict): Dictionary containing monthly rainfall data.

    Returns:
        dict: Prediction and probability of a flood.
    """
    # Transform input data
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
    
    # Make predictions
    prediction = loaded_model.predict(new_data)[0]
    prob_flood = loaded_model.predict_proba(new_data)[0][1]
    
    return {
        "prediction": "Flood predicted" if prediction == 1 else "No flood predicted",
        "probability": prob_flood * 100
    }
