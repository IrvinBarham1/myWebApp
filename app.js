const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const homeRoutes = require('./routes/homepage');
const ejs = require('ejs');

const reportRoutes = require('./routes/report');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.set('views','views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(homeRoutes);
app.use(reportRoutes);

app.use((req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.ejs'))
     res.status(404).render(path.join(__dirname, 'views', '404.ejs'), {
            pageTitle: 'Page Not Found!'
        });
});

app.listen(3000);
