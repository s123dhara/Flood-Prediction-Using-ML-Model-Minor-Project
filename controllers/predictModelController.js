require('dotenv').config()
const { regions } = require('../config/config');
const bodyparser = require('body-parser')
const cors = require('cors')
const axios = require('axios');
const { config } = require('../config/config');
console.log(config);
console.log(config.flaskurl);
console.log(process.env.FLASK_HOST);
console.log(process.env.PORT);


const renderPage = (req, res) => {
    res.render('model', { baseUrl : config.baseUrl || 4000 });
}

const getPredict = async (req, res) => {
    const { subdivision, rainfall } = req.body;
    console.log(req.body);
    try {
        // Send data to the Flask API (assumed to be running on localhost:5000)
        const response = await axios.post( `${config.flaskurl}/predict`, {
            subdivision,
            rainfall
            // "supriyo" : "codex"
        });
        console.log("output : ",response.data)
        res.json(response.data);
    } catch (error) {
        // console.error('Error calling Flask API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const serachRegions = async (req, res) => {

    // Get query from the request body
    const query = req.body.query.toLowerCase();
  
    // Filter regions based on the query
    const filteredRegions = regions.filter(region =>
      region.toLowerCase().includes(query)
    );
  
    // Return the filtered regions as a JSON response
    res.json(filteredRegions);
};

module.exports = { getPredict, renderPage, serachRegions };