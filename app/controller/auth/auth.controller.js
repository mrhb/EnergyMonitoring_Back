/*
* @author MjImani
* +989035074205
*/

const User = require('../../model/user/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const accessTokenSecret = 'MySecretKey';

exports.login = async (req, res, next) => {

    // Validate request
    if (!req.body.username) {
        throw next("نام کاربری نمیتواند خالی باشد.");
    }
    if (!req.body.password) {
        throw next("رمز عبور نمیتواند خالی باشد.");
    }
    if (!req.body.type) {
        throw next("نوع ورود نمیتواند خالی باشد.");
    }
    let accessToken;
    if (req.body.type === 'MOBILE'){
        accessToken = await authenticateByMobile(req.body.username, req.body.password);
    }else if (req.body.type === 'EMAIL'){
        accessToken = await authenticateByEmail(req.body.username, req.body.password);
    }else {
        throw next('نوع ورود درست انتخاب نشده است.');
    }

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

async function authenticateByEmail(username, password) {
    let user = await User.findOne(
        {
            email: username,
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

async function authenticateByMobile(username, password) {
    let user = await User.findOne(
        {
            mobile: username,
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
