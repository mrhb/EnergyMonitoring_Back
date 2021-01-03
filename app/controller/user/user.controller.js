/*
* @author MjImani
* +989035074205
*/
const User = require('../../model/user/user.model');
const ForgetPassword = require('../../model/user/forgetPassword.model');
const crypto = require('crypto');
const userService = require('../../service/user/user.service');
const forgetPasswordService = require('../../service/user/forgetPassword.service');
const fs = require('fs');


exports.signup = (req, res, next) => {

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
    if (!req.body.email) {
        throw next("ایمیل نمیتواند خالی باشد.");
    }
    if (!req.body.mobile) {
        throw next("شماره همراه نمیتواند خالی باشد.");
    }
    if (!req.body.password) {
        throw next("رمز عبور نمیتواند خالی باشد.");
    }
    if (!req.body.passwordConfirm) {
        throw next("تکرار رمز عبور نمیتواند خالی باشد.");
    }
    if (req.body.password !== req.body.passwordConfirm) {
        throw next("رمز عبور و تکرار آن یکسان نمیباشد.");
    }

    // Check unique mobile and email

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        mobile: req.body.mobile,
        email: req.body.email,
        password: crypto.createHash('sha512').update(req.body.password).digest("hex"),
        role: 'USER',
        photo: req.body.photo,
        organizationalUnit: req.body.organizationalUnit,
        organizationalLevel: req.body.organizationalLevel,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        isActive: true,
    });

    user.save()
        .then(result => {
            res.send({
                flag: true,
                data: result._id
            })
        })
        .catch(err => {
            console.log('err in save user ' + err.message);
            res.status(500).send({
                flag: false,
                message: "خطایی رخ داده است."
            })
        });
};

exports.isMobileExists = (req, res) => {
    let query = getOneByMobile(req.params.mobile);
    query.exec(function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({
                flag: false,
                message: "خطایی رخ داده است."
            });
        }
        if (user) {
            res.send({
                flag: true,
                data: true
            })
        } else {
            res.send({
                flag: true,
                data: false
            })
        }
    });
};

exports.isEmailExists = (req, res) => {
    let query = getEmailIsExistsQuery(req.params.email);
    query.exec(function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send({
                flag: false,
                message: "خطایی رخ داده است."
            });
        }
        if (user) {
            res.send({
                flag: true,
                data: true
            })
        } else {
            res.send({
                flag: true,
                data: false
            })
        }
    });
};

function getOneByMobile(mobile) {
    console.log('mobile ... ' + mobile);
    return User.findOne({
        "mobile": mobile
    });
}

function getEmailIsExistsQuery(email) {
    console.log('email ... ' + email);
    return User.findOne({
        "email": email
    });
}

function getUsernameIsExistsQuery(username) {
    console.log('username ... ' + username);
    return User.findOne({
        "username": username
    });
}


exports.getProfile = (req, res, next) => {
    console.log('re id ' + req.user.id);
    userService
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

    userService
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

    userService
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

exports.uploadProfilePhoto = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let imgPath = 'imani.png';
    let user = new User;
    user.photo.data = fs.readFileSync(imgPath);
    user.photo.contentType = 'image/png';

    userService
        .uploadProfilePhoto(req.user.id, user.photo)
        .then(result => {
            if (result) {
                if (result.nModified === 1 && result.ok === 1) {
                    res.send({
                        flag: true,
                        data: true
                    })
                } else {
                    next("در آپلود عکس پروفایل خطایی رخ داده است.")
                }
            } else {
                next("خطایی رخ داده است.");
            }
        }).catch(err => next(err));
};

exports.reqForgetPassword = (req, res, next) => {

    // Validate request
    if (!req.body.tokenType) {
        throw next("نوع درخواست نمیتواند خالی باشد.");
    }
    if (req.body.tokenType !== 'SMS' && req.body.tokenType !== 'EMAIL') {
        throw next("نوع درخواست درست نمیباشد.");
    }

    if (req.body.tokenType === 'SMS') {
        if (!req.body.mobile) {
            throw next("شماره موبایل نمیتواند خالی باشد.");
        }
        if (req.body.mobile.length !== 11) {
            throw next("شماره موبایل درست وارد نشده است.");
        }
        // Check valid number

        userService
            .getOneByMobile(req.body.mobile)
            .then(result => {
                if (!result) {
                    throw next("برای شماره وارد شده اکانتی وجود ندارد.");
                }
                console.log('result._id ' + result._id);
                // Generate random token
                let token = getRndInteger(100000, 999999);
                console.log('token ' + token);

                // let myJSON = JSON.stringify(result);
                // console.log('myJSON ' + myJSON);hhhh
                let expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes() + 5);

                // Save ForgetPassword
                let forgetPassword = new ForgetPassword({
                    userId: result._id,
                    tokenType: 'SMS',
                    mobile: result.mobile,
                    token: token,
                    expireDate: expireDate
                });
                console.log('forgetPassword ' + forgetPassword.token);
                // Save in Db
                forgetPasswordService.saveForgetPassword(forgetPassword)
                    .then(r => console.log('r ' + r));

                // Send token by sms

                res.send({
                    flag: true,
                    data: true
                });
            }).catch(err => next(err));
    } else if (req.body.tokenType === 'EMAIL') {
        if (!req.body.email) {
            throw next("ایمیل نمیتواند خالی باشد.");
        }
        // Check valid email

        userService
            .getOneByEmail(req.body.email)
            .then(result => {
                console.log('result ' + result);
                if (!result) {
                    throw next("برای ایمیل وارد شده اکانتی وجود ندارد.");
                }
                // Generate random token

                // Save ForgetPassword

                // Send token by email


                res.send({
                    flag: true,
                    data: true
                });
            }).catch(err => next(err));
    }
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

exports.resetPassword = (req, res, next) => {

    // Validate request
    if (!req.body.tokenType) {
        throw next("نوع درخواست نمیتواند خالی باشد.");
    }
    if (req.body.tokenType !== 'SMS' && req.body.tokenType !== 'EMAIL') {
        throw next("نوع درخواست درست نمیباشد.");
    }
    if (!req.body.token) {
        throw next("توکن نمیتواند خالی باشد.");
    }
    if (!req.body.password) {
        throw next("رمز عبور نمیتواند خالی باشد.");
    }
    if (!req.body.passwordConfirm) {
        throw next("تکرار رمز عبور نمیتواند خالی باشد.");
    }
    if (req.body.password !== req.body.passwordConfirm) {
        throw next("رمز عبور و تکرار آن یکسان نمیباشد.");
    }

    if (req.body.tokenType === 'SMS') {
        if (!req.body.mobile) {
            throw next("شماره موبایل نمیتواند خالی باشد.");
        }
        if (req.body.mobile.length !== 11) {
            throw next("شماره موبایل درست وارد نشده است.");
        }
        // Check valid number

        forgetPasswordService.getByMobileAndToken(req.body)
            .then(result => {
                console.log('result ' + result);
                if (!result) {
                    throw next("توکن وارد شده منقضی شده است.");
                }

                userService
                    .updatePassword(result.userId, req.body.password)
                    .then(result => {
                        if (result) {
                            if (result.nModified === 1 && result.ok === 1) {

                                forgetPasswordService.deleteById(result._id).then(r => console.log('r in delete ' + r));

                                res.send({
                                    flag: true,
                                    data: true
                                })

                            } else {
                                next("در دوباره بازنشانی رمز عبور خطایی رخ داده است.");
                            }
                        } else {
                            next("خطایی رخ داده است.");
                        }
                    }).catch(err => next(err));

            })
            .catch(err => next(err));

    } else if (req.body.tokenType === 'EMAIL') {
        if (!req.body.email) {
            throw next("ایمیل نمیتواند خالی باشد.");
        }
        // Check valid email


        forgetPasswordService.getByEmailAndToken(req.body)
            .then(result => {
                console.log('result ' + result);
                if (!result) {
                    throw next("توکن وارد شده منقضی شده است.");
                }

                userService
                    .updatePassword(result.userId, req.body.password)
                    .then(result => {
                        if (result) {
                            if (result.nModified === 1 && result.ok === 1) {

                                forgetPasswordService.deleteById(result._id).then(r => console.log('r in delete ' + r));

                                res.send({
                                    flag: true,
                                    data: true
                                })

                            } else {
                                next("در دوباره بازنشانی رمز عبور خطایی رخ داده است.");
                            }
                        } else {
                            next("خطایی رخ داده است.");
                        }
                    }).catch(err => next(err));

            })
            .catch(err => next(err));
    }
};

