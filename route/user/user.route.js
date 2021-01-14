/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let USER = config.API + 'user/';

    let AuthController = require('../../controller/auth/auth.controller');
    let UserController = require('../../controller/user/user.controller');

    app.post(config.API + 'auth/login', AuthController.login);

    app.post(USER + 'signup', UserController.signup);

    app.get(USER + 'is-mobile-exists/:mobile', UserController.isMobileExists);

    app.get(USER + 'is-email-exists/:email', UserController.isEmailExists);

    app.get(USER + 'get-profile', jwt(), UserController.getProfile);

    app.put(USER + 'update-profile', jwt(), UserController.updateProfile);

    app.put(USER + 'update-password', jwt(), UserController.updatePassword);

    app.put(USER + 'update-email/:email', jwt(), UserController.updateEmail);

    app.put(USER + 'upload-profile-photo', jwt(), UserController.uploadProfilePhoto);

    app.post(USER + 'req-forget-password', UserController.reqForgetPassword);

    app.post(USER + 'reset-password', UserController.resetPassword);

    app.get(USER + 'test', UserController.test);

};
