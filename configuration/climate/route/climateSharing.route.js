/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = (app) => {

    let jwt = require('../../../middleware/auth/jwt');
    let hasRole = require('../../../middleware/auth/preAuthorize');
    let config = require('../../../config/config');
    let WATER_SHARING = config.API + 'climate-sharing/';

    // let climateSharingController = require('../../controller/sharing/climateSharing.controller');
    let climateSharingController = require('../controller/climateSharing.controller');

    /**
     * Create
     * Body : reqCreateClimateSharing.dto
     */
    app.post(WATER_SHARING + 'create', jwt(), climateSharingController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreateClimateSharing.dto
     */
    app.put(WATER_SHARING + 'update', jwt(), climateSharingController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(WATER_SHARING + 'delete', jwt(), climateSharingController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(WATER_SHARING + 'get-one', jwt(), climateSharingController.getOne);

    /**
     * Add buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.post(WATER_SHARING + 'add-building-allocation', jwt(), climateSharingController.addBuildingAllocation);

    /**
     * Update buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.put(WATER_SHARING + 'update-building-allocation', jwt(), climateSharingController.updateBuildingAllocation);

    /**
     * Delete buildingAllocation
     * Param : id,allocationId
     */
    app.delete(WATER_SHARING + 'delete-building-allocation', jwt(), climateSharingController.deleteBuildingAllocation);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body : {}
     */
    app.post(WATER_SHARING + 'get-list-pageable-by-filter', jwt(),climateSharingController.getListPageableByFilter)

    /**
     * Get list pageable by term and without building
     * Param : page,size
     * Body : { term }
     */
    app.post(WATER_SHARING + 'get-list-pageable-by-term-and-not-building', jwt(),climateSharingController.getListPageableByTerm)

};
