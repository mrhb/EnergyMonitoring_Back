/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = (app) => {

    let jwt = require('../../../middleware/auth/jwt');
    let hasRole = require('../../../middleware/auth/preAuthorize');//../../middleware/auth/preAuthorize');
    let config = require('../../../config/config.json');//'../../config/config');
    let WATER_RECEIPT = config.API + 'climate-receipt/';

    let receiptController = require('../controller/climateReceipt.controller');

    /**
     * Create
     * Body : reqCreatePowerReceipt.dto
     */
    app.post(WATER_RECEIPT + 'create', jwt(), receiptController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreatePowerReceipt.dto
     */
    app.put(WATER_RECEIPT + 'update', jwt(), receiptController.update);

        /**
     * Delete
     * Param : id
     */
    app.delete(WATER_RECEIPT + 'delete', jwt(), receiptController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(WATER_RECEIPT + 'get-one', jwt(), receiptController.getOne);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    app.post(WATER_RECEIPT + 'get-list-pageable-by-filter', jwt(),receiptController.getListPageableByFilter)


};
