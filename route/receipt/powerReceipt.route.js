/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let RECEIPT = config.API + 'power-receipt/';

    let receiptController = require('../../controller/receipt/powerReceipt.controller');

    app.post(RECEIPT + 'create', jwt(), receiptController.create);

};
