/* Routes used for media streaming */

var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var verifyToken = require('../auth/verifytoken');
var mongoDb = require('../database/mongo');

/* TODO: Put this in a configuration file */
const contentBaseDirectory = '/../media/';

/* File Streaming */
router.get('/video/',verifyToken,function(req, res, next){
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

router.get('/image/',verifyToken,function(req, res, next){
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

router.get('/audio/',verifyToken,function(req, res, next){
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

/* File Upload */
router.post('/video/',function(req, res, next){
    console.log('uploading video');
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if(err) {
            console.log(err);
        }

        var contentType = files.videoUpload.type; // TODO: filter out invalid file types
        var oldPath = files.videoUpload.path;
        var newPath = path.join(__dirname, contentBaseDirectory, 'video/', files.videoUpload.name);

        fs.rename(oldPath, newPath, function(err) {
            if(err) {
                console.log("Error uploading video, err: " + err);
                res.write('Error uploading file');
                res.end();
            }
            else {
                res.write('success');
                res.end();
            }
        });
    });
});

router.post('/image/',function(req, res, next){
    console.log('uploading image');
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if(err) {
            console.log(err);
        }

        var contentType = files.imageUpload.type; // TODO: filter out invalid file types
        var oldPath = files.imageUpload.path;
        var newPath = path.join(__dirname, contentBaseDirectory, 'image/', files.imageUpload.name);

        fs.rename(oldPath, newPath, function(err) {
            if(err) {
                console.log("Error uploading video, err: " + err);
                res.write('Error uploading file');
                res.end();
            }
            else {
                res.write('success');
                res.end();
            }
        });
    });
});

router.post('/audio/',function(req, res, next){
    console.log('uploading audio');
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        if(err) {
            console.log(err);
        }

        var contentType = files.audioUpload.type; // TODO: filter out invalid file types
        var oldPath = files.audioUpload.path;
        var newPath = path.join(__dirname, contentBaseDirectory, 'audio/', files.audioUpload.name);
        var contentLength = files.audioUpload.size;
        var uploader = fields.uploader;
        var artist = fields.artist;
        var songName = fields.songName;

        fs.rename(oldPath, newPath, function(err) {
            if(err) {
                console.log("Error uploading video, err: " + err);
                res.write('Error uploading file');
                res.end();
            }
            else {
                var audioRecord = {
                    uploader: uploader,
                    artist: artist,
                    songName: songName,
                    fileName: files.audioUpload.name,
                    type: contentType,
                    contentLength: contentLength,
                    path: newPath
                };

                mongoDb.insertIntoCollection("audio",audioRecord);
                res.write('success');
                res.end();
            }
        });
    });
});

module.exports = router;
