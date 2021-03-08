/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let INSTRUMENT = config.API + 'instrument/';

    let instrumentController = require('../../controller/instrument/instrument.controller');

    /**
     * Create
     * Body : reqCreatePowerSharing.dto
     */
    app.post(INSTRUMENT + 'create', jwt(), instrumentController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreatePowerSharing.dto
     */
    app.put(INSTRUMENT + 'update', jwt(), instrumentController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(INSTRUMENT + 'delete', jwt(), instrumentController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(INSTRUMENT + 'get-one', jwt(), instrumentController.getOne);

    /**
     * Add buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.post(INSTRUMENT + 'add-building-allocation', jwt(), instrumentController.addBuildingAllocation);

    /**
     * Update buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.put(INSTRUMENT + 'update-building-allocation', jwt(), instrumentController.updateBuildingAllocation);

    /**
     * Delete buildingAllocation
     * Param : id,allocationId
     */
    app.delete(INSTRUMENT + 'delete-building-allocation', jwt(), instrumentController.deleteBuildingAllocation);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    app.post(INSTRUMENT + 'get-list-pageable-by-filter', jwt(),instrumentController.getListPageableByFilter)

    /**
     * Get list pageable by term and without building
     * Param : page,size
     * Body : { term }
     */
    app.post(INSTRUMENT + 'get-list-pageable-by-term-and-not-building', jwt(),instrumentController.getListPageableByTerm)

};
