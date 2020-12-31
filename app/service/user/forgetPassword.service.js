/*
* @author MjImani
* +989035074205
*/
const ForgetPassword = require('../../model/user/forgetPassword.model');


module.exports = {
    saveForgetPassword,
    getByMobileAndToken,
    getByEmailAndToken,
    deleteById
};

async function saveForgetPassword(forgetPassword) {
    try {
        return await ForgetPassword.create(forgetPassword);
    }catch (e) {
        console.log('e ' + e);
        return e;
    }
}

async function getByMobileAndToken(data) {
    try {
        console.log('data tokenType ' + data.tokenType);
        console.log('data token ' + data.token);
        console.log('data mobile ' + data.mobile);
        return await ForgetPassword.findOne(
            {
                tokenType: data.tokenType,
                token: data.token,
                mobile: data.mobile,
                expireDate: { $gte : new Date()}
            }
        );
    }catch (e) {
        console.log('e ' + e);
        return e;
    }
}


async function getByEmailAndToken(data) {
    try {
        return await ForgetPassword.findOne(
            {
                tokenType: data.tokenType,
                token: data.token,
                email: data.email,
                expireDate: { $gte : new Date()}
            }
        );
    }catch (e) {
        console.log('e ' + e);
        return e;
    }
}

async function deleteById(id) {
    try {
        return await ForgetPassword.deleteOne(
            {
                _id : id
            }
        );
    }catch (e) {
        console.log('e ' + e);
        return e;
    }
}

