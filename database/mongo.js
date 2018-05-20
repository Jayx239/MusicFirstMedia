var MongoClient = require('mongodb').MongoClient;
var config = require('../config/config');

var url = config.mongo_dialect + "://" + config.mongo_host + ":" + config.mongo_port + "/" + config.mongo_name;
var mongo_db;

var connect = function(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        mongo_db = db.db(config.mongo_name);
        callback(mongo_db);
    });
};

var createCollection = function(collectionName) {
    mongo_db.createCollection(collectionName, function(err, res) {
      if (err) throw err;
        console.log(collectionName + " collection created!");
    })
};

var insertIntoCollection = function(collectionName, data) {
    mongo_db.collection(collectionName).insert(data);
};

module.exports = {
    connect: connect,
    createCollection: createCollection,
    mongoClient: MongoClient,
    db: mongo_db,
    insertIntoCollection: insertIntoCollection
};