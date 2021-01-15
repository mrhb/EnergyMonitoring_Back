/**
 * @author MjImani
 * phone : +989035074205
 */
const userDao = require('../../dao/user/user.dao');
const Response = require('../../middleware/response/response-handler');
const ReqLoginDto = require('../../model/user/dto/reqLogin.dto');

exports.login = async (req, res, next) => {

    let myReq = new ReqLoginDto(req.body,next);
    userDao
        .authenticate(myReq)
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
