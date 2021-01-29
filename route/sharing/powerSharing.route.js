/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let POWER_SHARING = config.API + 'power-sharing/';

    let powerSharingController = require('../../controller/sharing/powerSharing.controller');

    /**
     * Create
     * Body : reqCreatePowerSharing.dto
     */
    app.post(POWER_SHARING + 'create', jwt(), powerSharingController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreatePowerSharing.dto
     */
    app.put(POWER_SHARING + 'update', jwt(), powerSharingController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(POWER_SHARING + 'delete', jwt(), powerSharingController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(POWER_SHARING + 'get-one', jwt(), powerSharingController.getOne);

    /**
     * Add buildingAllocation
     * Param : id
     * Body :
     */
    app.post(POWER_SHARING + 'add-building-allocation', jwt(), powerSharingController.addBuildingAllocation);

    /**
     * Update buildingAllocation
     * Param : id
     * Body :
     */
    // app.put(BUILDING + 'update-building-allocation', jwt(), powerSharingController.updateBuildingAllocation);

    /**
     * Delete buildingAllocation
     * Param : id,allocationId
     */
    // app.delete(BUILDING + 'delete-building-allocation', jwt(), powerSharingController.deleteBuildingAllocation);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    app.post(POWER_SHARING + 'get-list-pageable-by-filter', jwt(),powerSharingController.getListPageableByFilter)

};
