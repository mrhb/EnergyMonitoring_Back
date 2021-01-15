/**
 * @author MjImani
 * phone : +989035074205
 */

const User = require('../../model/user/user.model');
const ForgetPassword = require('../../model/user/forgetPassword.model');
const crypto = require('crypto');
const userDao = require('../../dao/user/user.dao');
const forgetPasswordDao = require('../../dao/user/forgetPassword.dao');
const Response = require('../../middleware/response/response-handler');
const ReqSignupDto = require('./dto/reqSignup.dto');
const ReqForgetPassword = require('./dto/reqForgetPassword.dto');
const ReqResetPasswordDto = require('./dto/reqResetPassword.dto');

exports.signup = async (req, res, next) => {

    let reqSignupDto = new ReqSignupDto(req.body, next);

    let isMobileExists = await userDao.isMobileExists(reqSignupDto.mobile)
        .then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        });
    if (isMobileExists) {
        throw next('شماره وارد شده تکراری میباشد.');
    }

    let isEmailExists = await userDao.isEmailExists(reqSignupDto.email)
        .then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        });
    if (isEmailExists) {
        throw next('ایمیل وارد شده تکراری میباشد.');
    }

    const user = new User({
        firstName: reqSignupDto.firstName,
        lastName: reqSignupDto.lastName,
        phone: reqSignupDto.phone,
        mobile: reqSignupDto.mobile,
        email: reqSignupDto.email,
        password: crypto.createHash('sha512').update(reqSignupDto.password).digest("hex"),
        role: 'USER',
        organizationalUnit: reqSignupDto.organizationalUnit,
        organizationalLevel: reqSignupDto.organizationalLevel,
        address: reqSignupDto.address,
        city: reqSignupDto.city,
        province: reqSignupDto.province,
        isActive: true,
    });
    userDao
        .signup(user)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ثبت نام خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.isMobileExists = async (req, res, next) => {
    let isMobileExists = await userDao.isMobileExists(req.params.mobile)
        .then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        });
    if (isMobileExists !== null) {
        res.send(Response(isMobileExists));
    } else {
        throw next('خطایی رخ داده است.');
    }
};

exports.isEmailExists = async (req, res, next) => {
    let isEmailExists = await userDao.isEmailExists(req.email)
        .then(result => {
            if (result) {
                return true;
            } else {
                return false;
            }
        });
    if (isEmailExists !== null) {
        res.send(Response(isEmailExists));
    } else {
        throw next('خطایی رخ داده است.');
    }
};

exports.getProfile = (req, res, next) => {
    console.log('re id ' + req.user.id);
    userDao
        .getProfile(req.user.id)
        .then(user => {
            if (user) {
                res.send({
                    flag: true,
                    data: user
                })
            } else {
                next("خطایی رخ داده است.");
            }
        }).catch(err => next(err));
};

exports.updateProfile = (req, res, next) => {
    console.log('re id ' + req.user.id);

    // Validate request
    if (!req.body.firstName) {
        throw next("نام نمیتواند خالی باشد.");
    }
    if (!req.body.lastName) {
        throw next("نام خانوادگی نمیتواند خالی باشد.");
    }
    if (!req.body.phone) {
        throw next("شماره تلفن نمیتواند خالی باشد.");
    }
    if (!req.body.organizationalUnit) {
        throw next("واحد سازمانی نمیتواند خالی باشد.");
    }
    if (!req.body.organizationalLevel) {
        throw next("پست سازمانی نمیتواند خالی باشد.");
    }
    if (!req.body.address) {
        throw next("آدرس نمیتواند خالی باشد.");
    }
    if (!req.body.city) {
        throw next("شهر نمیتواند خالی باشد.");
    }
    if (!req.body.province) {
        throw next("استان نمیتواند خالی باشد.");
    }

    userDao
        .updateProfile(req.user.id, req.body)
        .then(result => {
            if (result) {
                if (result.nModified === 1 && result.ok === 1) {
                    res.send({
                        flag: true,
                        data: true
                    })
                } else {
                    res.send({
                        flag: false,
                        message: "در بروزرسانی اطلاعات پروفایل خطایی رخ داده است."
                    })
                }
            } else {
                next("خطایی رخ داده است.");
            }
        }).catch(err => next(err));
};

exports.updatePassword = (req, res, next) => {
    console.log('re id ' + req.user.id);

    // Validate request
    if (!req.body.password) {
        throw next("رمز عبور نمیتواند خالی باشد.");
    }
    if (!req.body.passwordConfirm) {
        throw next("تکرار رمز عبور نمیتواند خالی باشد.");
    }
    if (req.body.password !== req.body.passwordConfirm) {
        throw next("رمز عبور و تکرار آن یکسان نمیباشد.");
    }

    userDao
        .updatePassword(req.user.id, req.body.password)
        .then(result => {
            if (result) {
                if (result.nModified === 1 && result.ok === 1) {
                    res.send({
                        flag: true,
                        data: true
                    })
                } else {
                    res.send({
                        flag: false,
                        message: "در بروزرسانی اطلاعات رمز عبور خطایی رخ داده است."
                    })
                }
            } else {
                next("خطایی رخ داده است.");
            }
        }).catch(err => next(err));
};

exports.updateEmail = (req, res, next) => {
    console.log('re id ' + req.user.id);

    // Validate request
    if (!req.params.email) {
        throw next("ایمیل نمیتواند خالی باشد.");
    }

    userDao
        .updateEmail(req.user.id, req.params.email)
        .then(result => {
            if (result) {
                if (result.nModified === 1 && result.ok === 1) {
                    res.send({
                        flag: true,
                        data: true
                    })
                } else {
                    res.send({
                        flag: false,
                        message: "در بروزرسانی اطلاعات ایمیل خطایی رخ داده است."
                    })
                }
            } else {
                next("خطایی رخ داده است.");
            }
        }).catch(err => next(err));
};

exports.updateProfilePhoto = (req, res, next) => {

    console.log('re id ' + req.user.id);

    userDao
        .updateProfilePhoto(req.user.id, req.body.link)
        .then(result => {
            if (result) {
                if (result.nModified === 1 && result.ok === 1) {
                    res.send(Response(true))
                }
            }
            next("در بروزرسانی عکس پروفایل خطایی رخ داده است.")
        }).catch(err => next(err));
};

exports.reqForgetPassword = async (req, res, next) => {

    let reqForgetPassword = new ReqForgetPassword(req.body, next);

    let user = await userDao.getOneByUsernameAndType(reqForgetPassword.username, reqForgetPassword.tokenType)
        .then(result => {
            if (result === null) {
                throw next("برای نام کاربری وارد شده اکانتی وجود ندارد.");
            } else {
                return result;
            }
        }).catch(err => next(err));
    console.log(user);
    // Generate random token
    let token = getRndInteger(100000, 999999);
    console.log('token ' + token);
    // Generate expireDate
    let expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes() + 5);

    // Save ForgetPassword
    let forgetPassword = new ForgetPassword({
        userId: user._id,
        tokenType: reqForgetPassword.tokenType,
        username: reqForgetPassword.username,
        token: token,
        expireDate: expireDate
    });
    console.log('forgetPassword ' + forgetPassword.token);
    // Save in Db
    forgetPasswordDao.saveForgetPassword(forgetPassword)
        .then(r => {
            console.log('result ' + r);
            if (r === null) {
                throw next('لطفا دوباره تلاش کنید.');
            } else {
                res.send(Response(true));
            }
        })
        .catch(er => console.log(er));
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

exports.test = (req, res, next) => {
    res.send("hi");
};
exports.resetPassword = (req, res, next) => {
    let reqResetPasswordDto = new ReqResetPasswordDto(req.body, next);
    forgetPasswordDao.getByUsernameAndTokenAndTokenType(reqResetPasswordDto.username, reqResetPasswordDto.token, reqResetPasswordDto.tokenType)
        .then(result => {
            console.log('result ' + result);
            if (!result) {
                throw next("توکن وارد شده منقضی شده است.");
            }
            userDao
                .updatePassword(result.userId, reqResetPasswordDto.password)
                .then(result => {
                    if (result) {
                        if (result.nModified === 1 && result.ok === 1) {
                            // Delete request
                            forgetPasswordDao.deleteById(result._id).then(r => console.log('r in delete ' + r));
                            res.send(Response(true));
                        } else {
                            throw next("در دوباره بازنشانی رمز عبور خطایی رخ داده است.");
                        }
                    } else {
                        throw next("خطایی رخ داده است.");
                    }
                }).catch(err => console.log(err));

        })
        .catch(err => console.log(err));
};

