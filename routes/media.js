/* Routes used for media streaming */

var express = require('express');
var router = express.Router();
var fs = require('fs');

/* TODO: Put this in a configuration file */
const contentBaseDirectory = '/../public/MusicFirst/media/';


router.get('/video/',function(req, res, next){
    var fileName = req.query.filename;
    var file = __dirname + contentBaseDirectory + "video/" + fileName;
    fs.exists(file, function(exists) {
        if(exists) {
            var readStream = fs.createReadStream(file);
            readStream.pipe(res);
        }
        else {
            console.log(file);
            res.sendStatus(404);
            res.end();
        }
    });
});

router.get('/image/',function(req, res, next){
    var fileName = req.query.filename;
    var file = __dirname + contentBaseDirectory + "image/" + fileName;
    fs.exists(file, function(exists) {
        if(exists) {
            var readStream = fs.createReadStream(file);
            readStream.pipe(res);
        }
        else {
            console.log("Error retrieving file: " + file);
            res.sendStatus(404);
            res.end();
        }
    });
});

router.get('/audio/',function(req, res, next){
    var fileName = req.query.filename;
    var file = __dirname + contentBaseDirectory + "audio/" + fileName;
    fs.exists(file, function(exists) {
        if(exists) {
            var readStream = fs.createReadStream(file);
            readStream.pipe(res);
        }
        else {
            console.log("Error retrieving file: " + file);
            res.sendStatus(404);
            res.end();
        }
    });
});

router.get('/', function(req, res, next) {
    var fileName = req.query.filename;
    var file = __dirname + contentBaseDirectory + fileName;
    fs.exists(file, function(exists) {
        if(exists) {
            var readStream = fs.createReadStream(file);
            readStream.pipe(res);
        }
        else {
            console.log("Error retrieving file: " + file);
            res.sendStatus(404);
            res.end();
        }
    });

});

module.exports = router;
