/**
 * @author MRHB
 * phone : +989151575793
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let CLIMATE = config.API + 'climate/';

    let climateController = require('../../controller/climate/climate.controller');

    /**
     * Create
     * Body : reqCreateBuilding.dto
     */
    app.post(CLIMATE + 'insert-weather', [
        // jwt(),
         climateController.create]);

    // /**
    //  * Update
    //  * Param : id
    //  * Body : reqCreateBuilding.dto
    //  */
    // app.put(BUILDING + 'update', jwt(), buildingController.update);

    // /**
    //  * Delete
    //  * Param : id
    //  */
    // app.delete(BUILDING + 'delete', jwt(), buildingController.deleteBuilding);

    // /**
    //  * Update area
    //  * Param : id
    //  * Body : reqUpdateArea.dto
    //  */
    // app.put(BUILDING + 'update-area', jwt(), buildingController.updateArea);

    // /**
    //  * Create space
    //  * Param : id
    //  * Body : reqBuildingSpace.dto
    //  */
    // app.post(BUILDING + 'create-space', jwt(), buildingController.createSpace);

    // /**
    //  * Update space
    //  * Param : id
    //  * Body : reqBuildingSpace.dto
    //  */
    // app.put(BUILDING + 'update-space', jwt(), buildingController.updateSpace);

    // /**
    //  * Delete space
    //  * Param : id,spaceId
    //  */
    // app.delete(BUILDING + 'delete-space', jwt(), buildingController.deleteSpace);

    // /**
    //  * Create mapInformation
    //  * Param : id
    //  * Body : reqMapInformation.dto
    //  */
    // app.post(BUILDING + 'create-map-information', jwt(), buildingController.createMapInformation);

    // /**
    //  * Update mapInformation
    //  * Param : id
    //  * Body : reqMapInformation.dto
    //  */
    // app.put(BUILDING + 'update-map-information', jwt(), buildingController.updateMapInformation);

    // /**
    //  * Delete mapInformation
    //  * Param : id,mapId
    //  */
    // app.delete(BUILDING + 'delete-map-information', jwt(), buildingController.deleteMapInformation);

    // /**
    //  * Update wallInformation
    //  * Param : id
    //  * Body : reqWallInformation.dto
    //  */
    // app.put(BUILDING + 'update-wall-information', jwt(), buildingController.updateWallInformation);

    // /**
    //  * Get one building
    //  * Param : id
    //  */
    // app.get(BUILDING + 'get-one', jwt(), buildingController.getOne);

    // /**
    //  * Get list pageable by filter
    //  * Param : page,size
    //  * Body : reqBuildingPageFilter.dto
    //  */
    // app.post(BUILDING + 'get-list-pageable-by-filter', jwt(),buildingController.getListPageableByFilter);

    // /**
    //  * Get list pageable by term
    //  * Param : page,size,term
    //  */
    // app.get(BUILDING + 'get-list-pageable-by-term', jwt(),buildingController.getListPageableByTerm)

};
