/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../../middleware/auth/jwt');
    let hasRole = require('../../../middleware/auth/preAuthorize');
    let config = require('../../../config/config');
    let WATER_SHARING = config.API + 'generation-sharing/';

    // let generationSharingController = require('../../controller/sharing/generationSharing.controller');
    let generationSharingController = require('../controller/generationSharing.controller');

    /**
     * Create
     * Body : reqCreateGenerationSharing.dto
     */
    app.post(WATER_SHARING + 'create', jwt(), generationSharingController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreateGenerationSharing.dto
     */
    app.put(WATER_SHARING + 'update', jwt(), generationSharingController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(WATER_SHARING + 'delete', jwt(), generationSharingController.delete);

    /**
     * Get one
     * Param : id
     */
    app.get(WATER_SHARING + 'get-one', jwt(), generationSharingController.getOne);

    /**
     * Add buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.post(WATER_SHARING + 'add-building-allocation', jwt(), generationSharingController.addBuildingAllocation);

    /**
     * Update buildingAllocation
     * Param : id
     * Body : reqBuildingAllocation.dto
     */
    app.put(WATER_SHARING + 'update-building-allocation', jwt(), generationSharingController.updateBuildingAllocation);

    /**
     * Delete buildingAllocation
     * Param : id,allocationId
     */
    app.delete(WATER_SHARING + 'delete-building-allocation', jwt(), generationSharingController.deleteBuildingAllocation);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body : {}
     */
    app.post(WATER_SHARING + 'get-list-pageable-by-filter', jwt(),generationSharingController.getListPageableByFilter)

    /**
     * Get list pageable by term and without building
     * Param : page,size
     * Body : { term }
     */
    app.post(WATER_SHARING + 'get-list-pageable-by-term-and-not-building', jwt(),generationSharingController.getListPageableByTerm)

};
