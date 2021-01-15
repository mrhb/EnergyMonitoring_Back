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
    signup,
    isMobileExists,
    isEmailExists,
    getProfile,
    updateProfile,
    updatePassword,
    getOneByUsernameAndType,
    updateProfilePhoto
};

async function authenticate(reqLoginDto) {
    let user;
    if (reqLoginDto.type === 'MOBILE') {
        user = await User.findOne(
            {
                mobile: reqLoginDto.username,
                password: crypto.createHash('sha512').update(reqLoginDto.password).digest("hex")
            }
        );
    } else {
        user = await User.findOne(
            {
                email: reqLoginDto.username,
                password: crypto.createHash('sha512').update(reqLoginDto.password).digest("hex")
            }
        );
    }

    if (user) {
        const token = jwt.sign({
            id: user.id,
            authorities: 'ROLE_' + user.role
        }, accessTokenSecret, {expiresIn: '1d'});
        return token;
    } else {
        return null;
    }
}

async function signup(user) {
    try {
        return await User.create(user);
    } catch (e) {
        console.log(e);
    }
}

async function isMobileExists(mobile) {
    try {
        return await User.findOne({
            "mobile": mobile
        });
    } catch (e) {
        console.log(e);
        return null;
    }
}

async function isEmailExists(email) {
    try {
        return await User.findOne({
            "email": email
        });
    } catch (e) {
        console.log(e);
        return null;
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

async function getOneByUsernameAndType(username, type) {
    try {
        if (type === 'MOBILE') {
            return await User.findOne(
                {
                    mobile: username
                },
                {
                    password: 0
                }
            );
        } else {
            return await User.findOne(
                {
                    email: username
                },
                {
                    password: 0
                }
            );
        }
    } catch (e) {
        console.log(e)
    }
}

//
// async function getOneByEmail(email) {
//     try {
//         return await User.findOne(
//             {
//                 email: email,
//                 isEmailVerify: true
//             },
//             {
//                 password: 0
//             }
//         );
//     } catch (e) {
//         console.log(e)
//     }
//
// }


async function updateProfilePhoto(id, link) {
    try {
        return await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    photo: link,
                }
            }
        );
    } catch (e) {
        console.log(e)
    }

}