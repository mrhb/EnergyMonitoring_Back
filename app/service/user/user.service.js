const User = require('../../model/user/user.model');
const crypto = require('crypto');

module.exports = {
    getProfile,
    updateProfile,
    updatePassword,
    getOneByMobile,
    getOneByEmail
};

async function getProfile(id) {
    return await User.findById(
        {
            _id: id
        },
        {
            password: 0
        }
    );
}

async function updateProfile(id, reqUserDto) {
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
}

async function updatePassword(id, reqChangePasswordDto) {
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
}

async function getOneByMobile(mobile) {
    return await User.find(
        {
            mobile: mobile,
            isMobileVerify: true
        },
        {
            password: 0
        }
    );
}

async function getOneByEmail(email) {
    return await User.find(
        {
            email: email,
            isEmailVerify: true
        },
        {
            password: 0
        }
    );
}