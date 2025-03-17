const path = require('path');

const express = require('express');

const router = express.Router();

const getDb = require('../util/database').getDb;

async function fetchByName(name, res) {
    const db = getDb();
    let queriedInfo = [];
    try{
        const users = await db.collection('users').find({name: name}, { projection: {}}).toArray();
        for (const element of users) {
            queriedInfo.push('Income: ' + element.income,
                ' Expense: ' + element.expense, ' Savings: ' + element.saving);
            return queriedInfo;
        }
    } catch (err) {
            console.log("Error executing query ", err);
            res.status(500).send("Internal Server Error");
        }
}

// database query for names
router.post('/getByName', async (req, res, next) => {
    const name = req.body.queryName;
    console.log('>>> Query: ', req.body);
    try {
      const query = await fetchByName(name, res);
      console.log('>>> Fetched From DB: ', query);
      res.json({ query });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error fetching data' });
    }
})

router.get('/query', (req, res, next) => {
    const db = getDb();
    let name = [];
    let income = expense = saving = 0.0;

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
        debt = saving - expense;
        if(debt > 0 )
            debt = debt + " You're saving Money!";
        else
            debt = debt +  " You're in debt!";
        res.render(path.join(__dirname, '../', 'views', 'database.ejs'), {
            pageTitle: 'Database',
            dbName: 'Database names: ' + name,
            avgIncome: income,
            avgExpense: expense,
            avgSaving: saving,
            avgDebt: debt
        })
    })
    .catch(err => {
        console.log("Error fetching users: ", err);
        res.status(500).send("Internal Server Error");
    })
})

module.exports = router;