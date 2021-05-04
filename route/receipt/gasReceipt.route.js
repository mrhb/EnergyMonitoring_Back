/**
 * @author MRHB
 * phone : +989151575793
 * email :mmmhajjar83@gmail.com
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let GAS_RECEIPT = config.API + 'gas-receipt/';

    let receiptController = require('../../controller/receipt/gasReceipt.controller');

    /**
     * Create
     * Body : reqCreateGasReceipt.dto
     */
    app.post(GAS_RECEIPT + 'create', jwt(), receiptController.create);

     /**
     * Create Multi
     * Body : list reqCreateGasReceipt.dto
     */
    app.post(GAS_RECEIPT + 'create-multi', jwt(), receiptController.createMulti);

    /**
     * Update
     * Param : id
     * Body : reqCreateGasReceipt.dto
     */
    app.put(GAS_RECEIPT + 'update', jwt(), receiptController.update);

        /**
     * Delete
     * Param : id
     */
    app.delete(GAS_RECEIPT + 'delete', jwt(), receiptController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(GAS_RECEIPT + 'get-one', jwt(), receiptController.getOne);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    app.post(GAS_RECEIPT + 'get-list-pageable-by-filter', jwt(),receiptController.getListPageableByFilter)


};
