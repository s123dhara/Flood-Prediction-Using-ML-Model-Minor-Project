// Load environment variables
require('dotenv').config();
const isMaintenance = process.env.MAINTENANCE === 'true';

// Define the maintenance page handler
const maintenancePage = (req, res) => {
    res.send('<h1>Maintenance Page</h1><p>We are currently undergoing maintenance. Please try again later.</p>');
};

// Middleware to check for maintenance mode
const isMaintenanceMiddleware = (req, res, next) => {
    if (isMaintenance) {
        return maintenancePage(req, res);
    }
    next();
};

module.exports = { isMaintenanceMiddleware };