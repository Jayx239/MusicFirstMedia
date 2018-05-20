var MongoClient = require('mongodb');
var mongoDb = require('../database/mongo');


mongoDb.connect(function(db) {
    createCollections();
});

var createCollections = function() {
    createVideoCollection();
    createImageCollection();
    createAudioCollection();
};

var createVideoCollection = function() {
    mongoDb.createCollection("video");
};

var createAudioCollection = function() {
    mongoDb.createCollection("audio");
};

var createImageCollection = function() {
    mongoDb.createCollection("image");
};

