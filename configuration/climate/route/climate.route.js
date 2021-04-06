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
         app.post(CLIMATE + 'update-climate', jwt(), climateController.updateClimate);

    /**
     * Update
     * Param : id
     * Body : reqCreateClimateSharing.dto
     */
    app.put(CLIMATE + 'update-weather',
    //  jwt(),
    climateController.updateWeather);
};
