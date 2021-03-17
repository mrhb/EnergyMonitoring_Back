/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../../middleware/auth/jwt');
    let hasRole = require('../../../middleware/auth/preAuthorize');
    let config = require('../../../config/config.json');
    let BUILDING = config.API + 'facility/';

    let facilityController = require('./../controller/facility.controller');

    /**
     * Create
     * Body : reqCreateFacility.dto
     */
    app.post(BUILDING + 'create', jwt(), facilityController.create);

    /**
     * Update
     * Param : id
     * Body : reqCreateFacility.dto
     */
    app.put(BUILDING + 'update', jwt(), facilityController.update);

    /**
     * Delete
     * Param : id
     */
    app.delete(BUILDING + 'delete', jwt(), facilityController.deleteFacility);

    
    /**
     * Create mapInformation
     * Param : id
     * Body : reqMapInformation.dto
     */
    app.post(BUILDING + 'create-map-information', jwt(), facilityController.createMapInformation);

    /**
     * Update mapInformation
     * Param : id
     * Body : reqMapInformation.dto
     */
    app.put(BUILDING + 'update-map-information', jwt(), facilityController.updateMapInformation);

    /**
     * Delete mapInformation
     * Param : id,mapId
     */
    app.delete(BUILDING + 'delete-map-information', jwt(), facilityController.deleteMapInformation);

    
    /**
     * Get one facility
     * Param : id
     */
    app.get(BUILDING + 'get-one', jwt(), facilityController.getOne);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body : reqFacilityPageFilter.dto
     */
    app.post(BUILDING + 'get-list-pageable-by-filter', jwt(),facilityController.getListPageableByFilter);

    /**
     * Get list pageable by term
     * Param : page,size,term
     */
    app.get(BUILDING + 'get-list-pageable-by-term', jwt(),facilityController.getListPageableByTerm)

};
