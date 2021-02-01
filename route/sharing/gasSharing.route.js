/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let GAS_SHARING = config.API + 'gas-sharing/';

    let gasSharingController = require('../../controller/sharing/gasSharing.controller');

    /**
     * Create
     * Body : reqCreatePowerSharing.dto
     */
    app.post(GAS_SHARING + 'create', jwt(), gasSharingController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreatePowerSharing.dto
     */
    app.put(GAS_SHARING + 'update', jwt(), gasSharingController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(GAS_SHARING + 'delete', jwt(), gasSharingController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(GAS_SHARING + 'get-one', jwt(), gasSharingController.getOne);

    /**
     * Add buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.post(GAS_SHARING + 'add-building-allocation', jwt(), gasSharingController.addBuildingAllocation);

    /**
     * Update buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.put(GAS_SHARING + 'update-building-allocation', jwt(), gasSharingController.updateBuildingAllocation);

    /**
     * Delete buildingAllocation
     * Param : id,allocationId
     */
    app.delete(GAS_SHARING + 'delete-building-allocation', jwt(), gasSharingController.deleteBuildingAllocation);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    app.post(GAS_SHARING + 'get-list-pageable-by-filter', jwt(),gasSharingController.getListPageableByFilter)

};
