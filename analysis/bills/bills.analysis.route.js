/**
 * @author M.Reza hajjar
 * phone : +989151575793
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let BILLS = config.AnalysisAPI + 'bills/';

    let rawBillAnalysisController = require('./raw/rawBillAnalysis.controller');
    // let normalizedBillAnalysisController = require('./normalized/nomalizedBillAnalysis.controller');

    app.post(BILLS + 'get-raw-bill-cost',rawBillAnalysisController.cost);
    app.post(BILLS + 'get-raw-bill-consumption', rawBillAnalysisController.consumption);

    // app.get(BILLS + 'get-normalized-bill-cost',normalizedBillAnalysisController.cost);
    // app.get(BILLS + 'get-normalized-bill-amount', normalizedBillAnalysisController.amount);
    
};