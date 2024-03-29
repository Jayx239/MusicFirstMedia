var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];

    if (!token)
        token = req.query.token;

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.jwt_encryption, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.user_name;
        next();
    });
}
module.exports = verifyToken;