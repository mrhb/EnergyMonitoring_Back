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
     * create-building
     * Body : reqCreateBuilding.dto
     */
    app.post(BUILDING + 'create-building', jwt(), buildingController.createBuilding);
    /**
     * Create
     * Body : reqCreateBuilding.dto
     */
     app.post(BUILDING + 'create-facility', jwt(), buildingController.createFacility);

    /**
     * Update
     * Param : id
     * Body : reqCreateBuilding.dto
     */
    app.put(BUILDING + 'update', jwt(), buildingController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(BUILDING + 'delete', jwt(), buildingController.deleteBuilding);

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

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body : reqBuildingPageFilter.dto
     */
    app.post(BUILDING + 'get-building-list-pageable-by-filter', jwt(),buildingController.getBildingListPageableByFilter);


        /**
     * Get list pageable by filter
     * Param : page,size
     * Body : reqBuildingPageFilter.dto
     */
         app.post(BUILDING + 'get-facility-list-pageable-by-filter', jwt(),buildingController.getFacilityListPageableByFilter);

    /**
     * Get list pageable by term
     * Param : page,size,term
     */
    app.get(BUILDING + 'get-list-pageable-by-term', jwt(),buildingController.getListPageableByTerm)
    /**
     * Get list pageable by term for selection
     * Param : page,size,term
     */
     app.get(BUILDING + 'get-list-pageable-by-term-for-selection', jwt(),buildingController.getListPageableByTermForSelection)

};
