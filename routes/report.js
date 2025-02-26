const path = require('path');
const express = require('express');

const router = express.Router();

router.post('/report', (req, res, next) => {
    console.log(req.body);
    const income = parseFloat(req.body.income);
    const expenses = parseFloat(req.body.expenses);
    const savings = parseFloat(req.body.savings);
    const name = req.body.name;
    const month = req.body.months;

    const netSavings = income - expenses;
    const goalStatus = netSavings >= savings ? "Goal Met" : "Goal Not Met";

    // Render the report.ejs file with the calculated values
    res.render(path.join(__dirname, '../', 'views', 'report.ejs'), {
        netSavings: netSavings,
        goalStatus: goalStatus,
        name : name,
        month : month
    });
});

module.exports = router;
