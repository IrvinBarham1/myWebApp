const path = require('path');

const express = require('express');

const router = express.Router();

const getDb = require('../util/database').getDb;


router.get('/query', (req, res, next) => {
    const db = getDb();
    let name = [];
    let income = expense = saving = 0;

    db.collection('users').find({}, { projection: {}}).toArray()
    .then(users => {
        //pull all previous name from the database
        for(const element of users){
            name.push(element.name + ' ');
            income += element.income;
            expense += element.expense;
            saving += element.saving;
        }  
        income /= users.length;
        income = Math.ceil(income);
        expense /= users.length;
        expense = Math.ceil(expense);
        saving /= users.length;
        saving = Math.ceil(saving);
        res.render(path.join(__dirname, '../', 'views', 'database.ejs'), {
            pageTitle: 'Database',
            dbName: 'Database names: ' + name,
            avgIncome: income,
            avgExpense: expense,
            avgSaving: saving
        })
    })
    .catch(err => {
        console.log("Error fetching users: ", err);
        res.status(500).send("Internal Server Error");
    })
})

module.exports = router;