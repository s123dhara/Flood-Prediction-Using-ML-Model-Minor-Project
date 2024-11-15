require('dotenv').config()
const express = require('express')
const router = express.Router()
const { blogRenderPage } = require('../controllers/blogController');


router.get('/' , blogRenderPage);


module.exports = router;