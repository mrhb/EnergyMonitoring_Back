/**
 * @author M.Reza hajjar
 * phone : +989151575793
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let LABEL = config.AnalysisAPI + 'label/';

    let labelAnalysisController = require('./labelAnalysis.controller');
    // let normalizedBillAnalysisController = require('./normalized/nomalizedBillAnalysis.controller');

    app.post(LABEL + 'get-building-label',labelAnalysisController.getlabel);
    
};
