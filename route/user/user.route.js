/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let USER = config.API + 'user/';

    let authController = require('../../controller/auth/auth.controller');
    let userController = require('../../controller/user/user.controller');

    app.post(config.API + 'auth/login', authController.login);

    app.post(USER + 'signup', userController.signup);

    app.get(USER + 'is-mobile-exists/:mobile', userController.isMobileExists);

    app.get(USER + 'is-email-exists/:email', userController.isEmailExists);

    app.get(USER + 'get-profile', jwt(), userController.getProfile);

    app.put(USER + 'update-profile', jwt(), userController.updateProfile);

    /**
     * Body : { photo}
     */
    app.put(USER + 'update-profile-photo', jwt(), userController.updateProfilePhoto);

    app.put(USER + 'update-password', jwt(), userController.updatePassword);
    app.put(USER + 'update-password-byAdmin', jwt(), userController.updatePasswordByAdmin);

    app.put(USER + 'update-mobile/:mobile', jwt(), userController.updateMobile);

    app.put(USER + 'update-email/:email', jwt(), userController.updateEmail);

    app.post(USER + 'req-forget-password', userController.reqForgetPassword);

    app.post(USER + 'reset-password', userController.resetPassword);

        /**
     * Get list pageable by filter
     * Param : page,size
     * Body : reqBuildingPageFilter.dto
     */
    app.post(USER + 'get-list-pageable-by-filter', jwt(),userController.getListPageableByFilter);



};
