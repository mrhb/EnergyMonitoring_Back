/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let POWER_RECEIPT = config.API + 'power-receipt/';

    let receiptController = require('../../controller/receipt/powerReceipt.controller');

    /**
     * Create
     * Body : reqCreatePowerReceipt.dto
     */
    app.post(POWER_RECEIPT + 'create', jwt(), receiptController.create);

    /**
     * Create Multi
     * Body : list reqCreatePowerReceipt.dto
     */
    app.post(POWER_RECEIPT + 'create-multi', jwt(), receiptController.createMulti);

    /**
     * Update
     * Param : id
     * Body : reqCreatePowerReceipt.dto
     */
    app.put(POWER_RECEIPT + 'update', jwt(), receiptController.update);

        /**
     * Delete
     * Param : id
     */
    app.delete(POWER_RECEIPT + 'delete', jwt(), receiptController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(POWER_RECEIPT + 'get-one', jwt(), receiptController.getOne);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    app.post(POWER_RECEIPT + 'get-list-pageable-by-filter', jwt(),receiptController.getListPageableByFilter)


};