const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render(path.join(__dirname, '../', 'views', 'homepage.ejs'), {
        pageTitle: 'Create Entry',
    })
})

module.exports = router;