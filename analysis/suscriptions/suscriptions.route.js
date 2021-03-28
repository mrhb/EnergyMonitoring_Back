/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let SUBSCRIPTIONS = config.AnalysisAPI + 'suscriptions/';

    let gasController = require('./gas/gas.controller');

    app.get(SUBSCRIPTIONS + 'get-capacity', gasController.capacity);
    
    
    // app.post(config.API + 'auth/login', authController.login);


    // app.put(SUBSCRIPTIONS + 'update-profile', jwt(), userController.updateProfile);

    // app.put(SUBSCRIPTIONS + 'update-profile-photo', jwt(), userController.updateProfilePhoto);

    // app.put(SUBSCRIPTIONS + 'update-password', jwt(), userController.updatePassword);

    // app.put(SUBSCRIPTIONS + 'update-mobile/:mobile', jwt(), userController.updateMobile);

    // app.put(SUBSCRIPTIONS + 'update-email/:email', jwt(), userController.updateEmail);

    // app.post(SUBSCRIPTIONS + 'req-forget-password', userController.reqForgetPassword);

    // app.post(SUBSCRIPTIONS + 'reset-password', userController.resetPassword);

};
