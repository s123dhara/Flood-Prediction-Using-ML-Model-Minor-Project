require('dotenv').config()
const express = require('express')
const router = express.Router()
const { aboutRenderPage } = require('../controllers/aboutController');


router.get('/', aboutRenderPage );


module.exports = router;