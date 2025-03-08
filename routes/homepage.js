const path = require('path');

const express = require('express');
const e = require('express');

const router = express.Router();

const getDb = require('../util/database').getDb;

router.get('/', (req, res, next) => {
    const db = getDb();
    let name = [];
    db.collection('users').find({}, { projection: {name: 1}}).toArray()
    .then(users => {
        //pull a previous name from the database
        for(const element of users){
            name.push(element.name + ' ');
        }
        /*
        if (name.length > 2) {
            for(let i = 3 ; i < name.length; i++) {
            db.collection('users').dropIndex();
            }
        }
        */
        res.render(path.join(__dirname, '../', 'views', 'homepage.ejs'), {
            pageTitle: 'Create Entry',
            dbName: 'Database names: ' + name
        })
    })
    .catch(err => {
        console.log("Error fetching users: ", err);
        res.status(500).send("Internal Server Error");
    })
})

module.exports = router;