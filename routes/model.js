require('dotenv').config()
const express = require('express')
const router = express.Router()
const { regions } = require('../config/config');
const bodyparser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { getPredict, renderPage, serachRegions } = require('../controllers/predictModelController')


router.get('/', renderPage);
router.post('/predict', getPredict);
router.post('/search-regions', serachRegions);


module.exports = router;