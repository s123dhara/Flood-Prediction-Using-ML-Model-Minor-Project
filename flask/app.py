from flask import Flask
from dotenv import load_dotenv
from config.config import Config
from controllers.prediction_controller import prediction_bp

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Register blueprints (controllers)
app.register_blueprint(prediction_bp)

if __name__ == '__main__':
    # app.run(debug=True)  # Enable debug
    app.run(host='0.0.0.0', port=Config.FLASK_PORT)
