/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let BUILDING = config.API + 'building/';

    let buildingController = require('../../controller/building/building.controller');

    /**
     * Create
     * Body : reqCreateBuilding.dto
     */
    app.post(BUILDING + 'create', jwt(), buildingController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreateBuilding.dto
     */
    app.put(BUILDING + 'update', jwt(), buildingController.update);

    /**
     * Create space
     * Param : id
     * Body : reqBuildingSpace.dto
     */
    app.post(BUILDING + 'create-space', jwt(), buildingController.createSpace);

    /**
     * Create space
     * Param : id,spaceId
     * Body : reqBuildingSpace.dto
     */
    app.put(BUILDING + 'update-space', jwt(), buildingController.updateSpace);

    /**
     * Delete space
     * Param : id,spaceId
     */
    app.delete(BUILDING + 'delete-space', jwt(), buildingController.deleteSpace);

    /**
     * Update step two
     * Param : id
     * Body :
     */
    app.put(BUILDING + 'update-step-two', jwt(), buildingController.createSpace);

    /**
     * Update step three
     * Param : id
     * Body :
     */
    app.put(BUILDING + 'update-step-three', jwt(), buildingController.createSpace);

};
