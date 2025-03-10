const path = require('path');
const express = require('express');

const router = express.Router();

const getDb = require('../util/database').getDb;

router.post('/report', (req, res, next) => {
    const db = getDb();
    db.collection('users')
    .insertOne({name: req.body.name,
        income: parseFloat(req.body.income),
        expense: parseFloat(req.body.expenses),
        saving: parseFloat(req.body.savings)})
    .then(result => {
        console.log(result);
        return db.collection('users').find().toArray();
    })
    .then(users => console.log('>>> Mongo DB: ', users))
    .catch(err => {console.error(err)});
        
    console.log('>>> Request Body ', req.body);
    const income = parseFloat(req.body.income);
    const expenses = parseFloat(req.body.expenses);
    const savings = parseFloat(req.body.savings);
    const name = req.body.name;
    const month = req.body.months;

    const netSavings = income - expenses;
    const goalStatus = netSavings >= savings ? "Goal Met" : "Goal Not Met";

    // Render the report.ejs file with the calculated values
    res.render(path.join(__dirname, '../', 'views', 'report.ejs'), {
        pageTitle: 'Financial Report',
        netSavings: netSavings,
        goalStatus: goalStatus,
        name : name,
        month : month
    });
});

module.exports = router;
