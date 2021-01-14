/**
 * @author MjImani
 * phone : +989035074205
 */
const userDao = require('../../dao/user/user.dao');
const Response = require('../../middleware/response/response-handler');

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
    userDao
        .authenticate(req.body.username, req.body.password, req.body.type)
        .then(accessToken => {
            console.log(accessToken);
            if (accessToken) {
                res.send(Response(accessToken))
            } else {
                res.send({
                    flag: false,
                    message: "نام کاربری یا رمز عبور اشتباه میباشد."
                })
            }
        }).catch(err => next(err));
};
