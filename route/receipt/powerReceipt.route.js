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

    /**
     * Create
     * Body : reqCreatePowerReceipt.dto
     */
    app.post(RECEIPT + 'create', jwt(), receiptController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreatePowerReceipt.dto
     */
    app.put(RECEIPT + 'update', jwt(), receiptController.update);

    /**
     * Get one
     * Param : id
     */
    app.get(RECEIPT + 'get-one', jwt(), receiptController.getOne);

};
