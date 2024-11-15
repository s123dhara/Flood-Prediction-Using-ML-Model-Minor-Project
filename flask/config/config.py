import os
from dotenv import load_dotenv
load_dotenv()

class Config:

    # Load PORT from .env file, with a default fallback
    FLASK_PORT = int(os.getenv("ML_PORT", 5000))
    print(f"Configured PORT: {FLASK_PORT}")
