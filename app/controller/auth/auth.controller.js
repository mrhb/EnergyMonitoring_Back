/*
* @author MjImani
* +989035074205
*/

const User = require('../../model/user/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accessTokenSecret = 'MySecretKey';

exports.login = async (req, res) => {

    // Validate request
    if (!req.body.username) {
        return res.status(400).send({
            flag: false,
            message: "نام کاربری نمیتواند خالی باشد."
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            flag: false,
            message: "رمز عبور نمیتواند خالی باشد."
        });
    }
    let accessToken = await authenticate(req.body.username, req.body.password);
    if (accessToken) {
        console.log('access token ' + accessToken);
        res.send({
            flag: true,
            data: accessToken
        })
    } else {
        res.send({
            flag: false,
            message: "نام کاربری یا رمز عبور اشتباه میباشد."
        })
    }
};

async function authenticate(username, password) {
    let user = await User.findOne(
        {
            username: username,
            password: crypto.createHash('sha512').update(password).digest("hex")
        }
    );
    if (user) {
        const token = jwt.sign({
            id: user.id,
            authorities: 'ROLE_' + user.role
        }, accessTokenSecret, {expiresIn: '1d'});
        return token;
    }
}

