const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const homeRoutes = require('./routes/homepage');
const ejs = require('ejs');

const reportRoutes = require('./routes/report');

app.use(bodyParser.urlencoded({extended: false}));
app.use(homeRoutes);
app.use(reportRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
});

app.listen(3000);
