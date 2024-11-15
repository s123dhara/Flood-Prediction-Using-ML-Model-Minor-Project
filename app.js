require('dotenv').config()

//Installation 
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

//Require Middleware
const { isTeamMenuViewShown } = require('./middleware/isTeamMenuViewShown')
const { appRendering } = require('./controllers/AppController')



app.use(cors());
app.use(bodyparser.json());


// Set it to Middlwware or Global Variable
app.use(isTeamMenuViewShown);


// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));



// Set Routes of Page 
const modelRouter = require('./routes/model')
const blogRouter = require('./routes/blog')
const aboutRouter = require('./routes/about');

  
// Use the Route and Deploy it
app.use('/model', modelRouter);
app.use('/blog', blogRouter);
app.use('/about', aboutRouter);




app.get('/', appRendering);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`); 
});
