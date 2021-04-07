/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = (app) => {

    let jwt = require('../../../middleware/auth/jwt');
    let hasRole = require('../../../middleware/auth/preAuthorize');
    let config = require('../../../config/config');
    let CLIMATE = config.API + 'climate/';

    // let climateSharingController = require('../../controller/sharing/climateSharing.controller');
    let climateController = require('../controller/climate.controller');


    /**
     * Create
     * Body : reqCreateFacility.dto
     */
         app.put(CLIMATE + 'update-climate', 
        //  jwt(),
          climateController.updateClimate);

    /**
     * Update
     * Param : id
     * Body : reqCreateClimateSharing.dto
     */
    app.put(CLIMATE + 'update-weather',
    climateController.updateWeather);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
     app.post(CLIMATE + 'get-climate-list-pageable-by-filter', 
     jwt(),
     climateController.getListPageableByFilter);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    //  app.post(CLIMATE + 'get-weather-list-by-yaer', 
    //  jwt(),
    //  waetherListController.getListPageableByFilter);
    };
