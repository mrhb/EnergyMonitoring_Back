/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */
module.exports = (app) => {

    let jwt = require('../../../middleware/auth/jwt');
    let hasRole = require('../../../middleware/auth/preAuthorize');
    let config = require('../../../config/config');
    let WATER_SHARING = config.API + 'facility-sharing/';

    // let facilitySharingController = require('../../controller/sharing/facilitySharing.controller');
    let facilitySharingController = require('../controller/facilitySharing.controller');

    /**
     * Create
     * Body : reqCreatefacilitySharing.dto
     */
    app.post(WATER_SHARING + 'create', jwt(), facilitySharingController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreatefacilitySharing.dto
     */
    app.put(WATER_SHARING + 'update', jwt(), facilitySharingController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(WATER_SHARING + 'delete', jwt(), facilitySharingController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(WATER_SHARING + 'get-one', jwt(), facilitySharingController.getOne);

    /**
     * Add buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.post(WATER_SHARING + 'add-building-allocation', jwt(), facilitySharingController.addBuildingAllocation);

    /**
     * Update buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.put(WATER_SHARING + 'update-building-allocation', jwt(), facilitySharingController.updateBuildingAllocation);

    /**
     * Delete buildingAllocation
     * Param : id,allocationId
     */
    app.delete(WATER_SHARING + 'delete-building-allocation', jwt(), facilitySharingController.deleteBuildingAllocation);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body : {}
     */
    app.post(WATER_SHARING + 'get-list-pageable-by-filter', jwt(),facilitySharingController.getListPageableByFilter)

    /**
     * Get list pageable by term and without building
     * Param : page,size
     * Body : { term }
     */
    app.post(WATER_SHARING + 'get-list-pageable-by-term-and-not-building', jwt(),facilitySharingController.getListPageableByTerm)

};
