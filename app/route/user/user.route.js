/*
* @author MjImani
* +989035074205
*/
module.exports = (app) => {

    const jwt = require('../../middleware/auth/jwt');
    const hasRole = require('../../middleware/auth/preAuthorize');

    const userController = require('../../controller/user/user.controller');
    const authController = require('../../controller/auth/auth.controller');
    const config = require('../../config/config');

    const USER = config.prefix + 'user/';

    app.post(config.prefix + 'auth/login', authController.login);

    app.post(USER + 'signup', userController.signup);

    app.get(USER + 'is-mobile-exists/:mobile', userController.isMobileExists);

    app.get(USER + 'is-email-exists/:email', userController.isEmailExists);

    app.get(USER + 'is-username-exists/:username', userController.isUsernameExists);

    app.get(USER + 'get-profile',jwt(), userController.getProfile);

    app.put(USER + 'update-profile',jwt(), userController.updateProfile);

    app.put(USER + 'update-password',jwt(), userController.updatePassword);

    app.put(USER + 'upload-profile-photo',jwt(), userController.uploadProfilePhoto);

    app.post(USER + 'req-forget-password', userController.reqForgetPassword);

    app.post(USER + 'reset-password', userController.resetPassword);

};
