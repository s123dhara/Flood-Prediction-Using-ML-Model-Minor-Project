const regions = [
    "Andaman & Nicobar Islands",
    "Arunachal Pradesh",
    "Assam & Meghalaya",
    "Naga Mani Mizo Tripura",
    "Sub Himalayan West Bengal & Sikkim",
    "Gangetic West Bengal",
    "Orissa",
    "Jharkhand",
    "Bihar",
    "East Uttar Pradesh",
    "West Uttar Pradesh",
    "Uttarakhand",
    "Haryana Delhi & Chandigarh",
    "Punjab",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "West Rajasthan",
    "East Rajasthan",
    "West Madhya Pradesh",
    "East Madhya Pradesh",
    "Gujarat Region",
    "Saurashtra & Kutch",
    "Konkan & Goa",
    "Madhya Maharashtra",
    "Marathwada",
    "Vidarbha",
    "Chhattisgarh",
    "Coastal Andhra Pradesh",
    "Telangana",
    "Rayalseema",
    "Tamil Nadu",
    "Coastal Karnataka",
    "North Interior Karnataka",
    "South Interior Karnataka",
    "Kerala",
    "Lakshadweep"
];

require('dotenv').config();
const PORT = process.env.PORT || 4000;
const FLASK_PORT = process.env.FLASK_PORT || 5000;

// config.js
const config = {
  baseUrl: process.env.HOST === 'localhost'
    ? `http://localhost:${PORT}` // Local development URL
    : 'https://floodprediction-gvnmjhks.b4a.run', // Live domain URL
 
  flaskurl: process.env.FLASK_HOST === 'localhost'
    ? `http://127.0.0.1:${FLASK_PORT}` // Local development URL
    : 'https://flask-temp-el3a.onrender.com', // Live domain URL
};

module.exports = { regions, config };