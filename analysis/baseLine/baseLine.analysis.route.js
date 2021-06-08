/**
 * @author M.Reza hajjar
 * phone : +989151575793
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let BASELINE = config.AnalysisAPI + 'baseLine/';

    let baseLineAnalysisController = require('./baseLineAnalysis.controller');
    // let normalizedBillAnalysisController = require('./normalized/nomalizedBillAnalysis.controller');

    app.post(BASELINE + 'get-building-baseLine',baseLineAnalysisController.getbaseLine);
    app.post(BASELINE + 'get-building-baseLine-singleCarier',baseLineAnalysisController.getbaseLineSingleCarier);
    
};
