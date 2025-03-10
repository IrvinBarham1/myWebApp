const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    MongoClient.connect('mongodb+srv://irvinbarham:84UdqULeNUhg3B7@cluster0.nv8rc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
        console.log('>>> Connected!');
        _db = client.db();
        callback();
    }).catch(err=>{
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if(_db) {
        return _db; 
    }
    throw 'No Databse Found';
};
module.exports = {
    mongoConnect,
    getDb
};
