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
     * Update area
     * Param : id
     * Body : reqUpdateArea.dto
     */
    app.put(BUILDING + 'update-area', jwt(), buildingController.updateArea);

    /**
     * Create space
     * Param : id
     * Body : reqBuildingSpace.dto
     */
    app.post(BUILDING + 'create-space', jwt(), buildingController.createSpace);

    /**
     * Update space
     * Param : id
     * Body : reqBuildingSpace.dto
     */
    app.put(BUILDING + 'update-space', jwt(), buildingController.updateSpace);

    /**
     * Delete space
     * Param : id,spaceId
     */
    app.delete(BUILDING + 'delete-space', jwt(), buildingController.deleteSpace);

    /**
     * Create mapInformation
     * Param : id
     * Body : reqMapInformation.dto
     */
    app.post(BUILDING + 'create-map-information', jwt(), buildingController.createMapInformation);

    /**
     * Update mapInformation
     * Param : id
     * Body : reqMapInformation.dto
     */
    app.put(BUILDING + 'update-map-information', jwt(), buildingController.updateMapInformation);

    /**
     * Delete mapInformation
     * Param : id,mapId
     */
    app.delete(BUILDING + 'delete-map-information', jwt(), buildingController.deleteMapInformation);

    /**
     * Update wallInformation
     * Param : id
     * Body : reqWallInformation.dto
     */
    app.put(BUILDING + 'update-wall-information', jwt(), buildingController.updateWallInformation);

    /**
     * Get one building
     * Param : id
     */
    app.get(BUILDING + 'get-one', jwt(), buildingController.getOne);

};