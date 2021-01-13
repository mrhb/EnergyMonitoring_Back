/*
* @author MjImani
* +989035074205
*/
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const userService = require('../../dao/user/user.dao');


module.exports = function () {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, config.jwtSecret, (err, data) => {
                if (err) {
                    return res.sendStatus(403);
                }else {
                    req.user = data;
                    next();
                }
            });
        } else {
            res.sendStatus(401);
        }
    };
};



