/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let WATER_SHARING = config.API + 'water-sharing/';

    let waterSharingController = require('../../controller/sharing/waterSharing.controller');

    /**
     * Create
     * Body : reqCreateWaterSharing.dto
     */
    app.post(WATER_SHARING + 'create', jwt(), waterSharingController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreateWaterSharing.dto
     */
    app.put(WATER_SHARING + 'update', jwt(), waterSharingController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(WATER_SHARING + 'delete', jwt(), waterSharingController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(WATER_SHARING + 'get-one', jwt(), waterSharingController.getOne);

    /**
     * Add buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.post(WATER_SHARING + 'add-building-allocation', jwt(), waterSharingController.addBuildingAllocation);

    /**
     * Update buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.put(WATER_SHARING + 'update-building-allocation', jwt(), waterSharingController.updateBuildingAllocation);

    /**
     * Delete buildingAllocation
     * Param : id,allocationId
     */
    app.delete(WATER_SHARING + 'delete-building-allocation', jwt(), waterSharingController.deleteBuildingAllocation);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body : {}
     */
    app.post(WATER_SHARING + 'get-list-pageable-by-filter', jwt(),waterSharingController.getListPageableByFilter)

    /**
     * Get list pageable by term and without building
     * Param : page,size
     * Body : { term }
     */
    app.post(WATER_SHARING + 'get-list-pageable-by-term-and-not-building', jwt(),waterSharingController.getListPageableByTerm)

};
