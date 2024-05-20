const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const cookieParser = require("cookie-parser");

const corse = require('./middlewares/corse');
const connectToDatabase = require('./database/connect');

const apiRouter = require('./routes/apiRouter');
const pagesRouter = require('./routes/pages');
const PORT = 3001;
const app = express();

connectToDatabase();
app.use(
    corse, 
    cookieParser(),
    bodyParser.json(),
    pagesRouter,
    express.static(path.join(__dirname, 'public')),
    apiRouter,
); 

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
})