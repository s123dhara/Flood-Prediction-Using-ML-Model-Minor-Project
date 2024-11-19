require('dotenv').config(); // Load environment variables

const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;


// Config
const { config } = require('./config/config');


// Load environment variables
const isMaintenance = process.env.MAINTENANCE === 'true';

// Require Middleware
const { isTeamMenuViewShown } = require('./middleware/isTeamMenuViewShown');
const { isMaintenanceMiddleware } = require('./middleware/isMaintenance');


// Controllers
const { appRendering } = require('./controllers/AppController');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Use custom middleware globally
app.use(isTeamMenuViewShown);
app.use(isMaintenanceMiddleware);

// Routes
const modelRouter = require('./routes/model');
const blogRouter = require('./routes/blog');
const aboutRouter = require('./routes/about');

// Use the Routes
app.use('/model', modelRouter);
app.use('/blog', blogRouter);
app.use('/about', aboutRouter);


// Home route
app.get('/', appRendering);

// If no match, fallback to maintenance page
app.use('*', (req, res) => {
    if (isMaintenance) {
        return isMaintenanceMiddleware(req, res); // Maintenance middleware
    } else {
        res.render('404');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at ${config.baseUrl}`);
});
