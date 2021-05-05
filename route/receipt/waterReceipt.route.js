/**
 * @author MRHB
 * phone : +989151575793
 * email :mmmhajjar83@gmail.com
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let WATER_RECEIPT = config.API + 'water-receipt/';

    let receiptController = require('../../controller/receipt/waterReceipt.controller');

    /**
     * Create
     * Body : reqCreateWaterReceipt.dto
     */
    app.post(WATER_RECEIPT + 'create', jwt(), receiptController.create);

    /**
     * Create Multi
     * Body : list reqCreateWaterReceipt.dto
     */
     app.post(WATER_RECEIPT + 'create-multi', jwt(), receiptController.createMulti);

    /**
     * Update
     * Param : id
     * Body : reqCreateWaterReceipt.dto
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
