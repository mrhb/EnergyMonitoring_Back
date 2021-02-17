/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let ENERGY_SHARING = config.API + 'energy-sharing/';

    let energySharingController = require('../../controller/sharing/energySharing.controller');

    /**
     * Create
     * Body : reqCreateEnergySharing.dto
     */
    app.post(ENERGY_SHARING + 'create', jwt(), energySharingController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreateEnergySharing.dto
     */
    app.put(ENERGY_SHARING + 'update', jwt(), energySharingController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(ENERGY_SHARING + 'delete', jwt(), energySharingController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(ENERGY_SHARING + 'get-one', jwt(), energySharingController.getOne);

    /**
     * Add buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.post(ENERGY_SHARING + 'add-building-allocation', jwt(), energySharingController.addBuildingAllocation);

    /**
     * Update buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.put(ENERGY_SHARING + 'update-building-allocation', jwt(), energySharingController.updateBuildingAllocation);

    /**
     * Delete buildingAllocation
     * Param : id,allocationId
     */
    app.delete(ENERGY_SHARING + 'delete-building-allocation', jwt(), energySharingController.deleteBuildingAllocation);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    app.post(ENERGY_SHARING + 'get-list-pageable-by-filter', jwt(),energySharingController.getListPageableByFilter);

    /**
     * Get list pageable by term and without building
     * Param : page,size
     * Body : { term }
     */
    app.post(ENERGY_SHARING + 'get-list-pageable-by-term-and-not-building', jwt(),energySharingController.getListPageableByTerm);

};
