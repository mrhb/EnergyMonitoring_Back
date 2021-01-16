/**
 * @author MjImani
 * phone : +989035074205
 */

const ForgetPassword = require('../../model/user/forgetPassword.model');


module.exports = {
    saveForgetPassword,
    getByUsernameAndTokenAndTokenType,
    deleteById
};

async function saveForgetPassword(forgetPassword) {
    try {
        return await ForgetPassword.create(forgetPassword);
    } catch (e) {
        console.log('e ' + e);
    }
}

async function getByUsernameAndTokenAndTokenType(username, token, tokenType) {
    try {
        return await ForgetPassword.findOne(
            {
                tokenType: tokenType,
                token: token,
                username: username,
                expireDate: {$gte: new Date()}
            }
        );
    } catch (e) {
        console.log('e ' + e);
    }
}


async function getByEmailAndToken(data) {
    try {
        return await ForgetPassword.findOne(
            {
                tokenType: data.tokenType,
                token: data.token,
                email: data.email,
                expireDate: {$gte: new Date()}
            }
        );
    } catch (e) {
        console.log('e ' + e);
    }
}

async function deleteById(id) {
    try {
        return await ForgetPassword.deleteOne(
            {
                _id: id
            }
        );
    } catch (e) {
        console.log('e ' + e);
    }
}
