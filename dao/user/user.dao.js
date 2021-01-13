/**
 * @author MjImani
 * phone : +989035074205
 */

const User = require('../../model/user/user.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'MySecretKey';

module.exports = {
    authenticate,
    getProfile,
    updateProfile,
    updatePassword,
    getOneByMobile,
    getOneByEmail,
    uploadProfilePhoto
};

async function authenticate(username, password, type) {
    console.log('type ' + type);
    let user;
    if (type === 'MOBILE'){
        user = await User.findOne(
            {
                mobile: username,
                password: crypto.createHash('sha512').update(password).digest("hex")
            }
        );
    }else {
        user = await User.findOne(
            {
                email: username,
                password: crypto.createHash('sha512').update(password).digest("hex")
            }
        );
    }

    if (user) {
        const token = jwt.sign({
            id: user.id,
            authorities: 'ROLE_' + user.role
        }, accessTokenSecret, {expiresIn: '1d'});
        return token;
    }
}

async function getProfile(id) {
    try {
        return await User.findById(
            {
                _id: id
            },
            {
                password: 0
            }
        );
    } catch (e) {
        console.log(e)
    }
}

async function updateProfile(id, reqUserDto) {
    try {
        return await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    firstName: reqUserDto.firstName,
                    lastName: reqUserDto.lastName,
                    phone: reqUserDto.phone,
                    organizationalUnit: reqUserDto.organizationalUnit,
                    organizationalLevel: reqUserDto.organizationalLevel,
                    address: reqUserDto.address,
                    city: reqUserDto.city,
                    province: reqUserDto.province,
                }
            }
        );
    } catch (e) {
        console.log(e)
    }

}

async function updatePassword(id, reqChangePasswordDto) {
    try {
        return await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    password: crypto.createHash('sha512').update(reqChangePasswordDto).digest("hex"),
                }
            }
        );
    } catch (e) {
        console.log(e)
    }

}

async function updateEmail(id, email) {
    try {
        return await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    email: email,
                }
            }
        );
    } catch (e) {
        console.log(e)
    }

}

async function getOneByMobile(mobile) {
    try {
        return await User.findOne(
            {
                mobile: mobile,
                isMobileVerify: true
            },
            {
                password: 0
            }
        );
    } catch (e) {
        console.log(e)
    }

}

async function getOneByEmail(email) {
    try {
        return await User.findOne(
            {
                email: email,
                isEmailVerify: true
            },
            {
                password: 0
            }
        );
    } catch (e) {
        console.log(e)
    }

}


async function uploadProfilePhoto(id, photo) {
    try {
        return await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    photo: photo,
                }
            }
        );
    } catch (e) {
        console.log(e)
    }

}
