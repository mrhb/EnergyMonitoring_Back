/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let SUBSCRIPTIONS = config.AnalysisAPI + 'suscriptions/';

    let gasAnalysisController = require('./gas/gasAnalysis.controller');
    let powerAnalysisController = require('./power/powerAnalysis.controller');

    app.get(SUBSCRIPTIONS + 'get-gas-capacity', gasAnalysisController.capacity);
    app.get(SUBSCRIPTIONS + 'get-gas-consuption', gasAnalysisController.consuption);
    app.get(SUBSCRIPTIONS + 'get-gas-contor', gasAnalysisController.contor);
    app.get(SUBSCRIPTIONS + 'get-gas-shir', gasAnalysisController.shir);
    
        
    app.get(SUBSCRIPTIONS + 'get-power-demandPenalty', powerAnalysisController.demandPenalty);
    app.get(SUBSCRIPTIONS + 'get-power-demand', powerAnalysisController.demand);
    app.get(SUBSCRIPTIONS + 'get-power-demandSum', powerAnalysisController.demandSum);
    app.get(SUBSCRIPTIONS + 'get-power-reactive', powerAnalysisController.reactive);
    app.get(SUBSCRIPTIONS + 'get-power-tariff', powerAnalysisController.tariff);
    app.get(SUBSCRIPTIONS + 'get-power-voltage', powerAnalysisController.voltage);
    
    // app.post(config.API + 'auth/login', authController.login);


    // app.put(SUBSCRIPTIONS + 'update-profile', jwt(), userController.updateProfile);

    // app.put(SUBSCRIPTIONS + 'update-profile-photo', jwt(), userController.updateProfilePhoto);

    // app.put(SUBSCRIPTIONS + 'update-password', jwt(), userController.updatePassword);

    // app.put(SUBSCRIPTIONS + 'update-mobile/:mobile', jwt(), userController.updateMobile);

    // app.put(SUBSCRIPTIONS + 'update-email/:email', jwt(), userController.updateEmail);

    // app.post(SUBSCRIPTIONS + 'req-forget-password', userController.reqForgetPassword);

    // app.post(SUBSCRIPTIONS + 'reset-password', userController.resetPassword);

};
