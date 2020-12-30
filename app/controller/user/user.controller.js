const User = require('../../model/user/user.model');
const crypto = require('crypto');
const userService = require('../../service/user/user.service');


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
    if (!req.body.username) {
        throw next("نام کاربری نمیتواند خالی باشد.");
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

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
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

exports.isUsernameExists = (req, res) => {
    let query = getUsernameIsExistsQuery(req.params.username);
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
                console.log('result ' + result);
                if (!result) {
                    throw next("برای شماره وارد شده اکانتی وجود ندارد.");
                }
                // Generate random token

                // Save ForgetPassword

                // Send token by sms


                res.send({
                    flag: true,
                    data: true
                });
            }).catch(err => next(err));
    }else if (req.body.tokenType === 'EMAIL') {
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


