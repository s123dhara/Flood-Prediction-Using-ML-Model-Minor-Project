require('dotenv').config()
const app = require('./app')
const http = require('http')

// Config
const { config } = require('./config/config');

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server is running at ${config.baseUrl}`)
})
