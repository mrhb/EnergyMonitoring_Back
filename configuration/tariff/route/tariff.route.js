/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = (app) => {

    let jwt = require('../../../middleware/auth/jwt');
    let hasRole = require('../../../middleware/auth/preAuthorize');
    let config = require('../../../config/config');
    let tariffController=require('../controller/tariff.controller');
    let power1TariffController=require('../controller/power1Tariff.controller');
    let TARIFF = config.API + 'tariff/';


    
    /**
     * Create
     * Body : reqCreateGenerationSharing.dto
     */
     app.post(TARIFF + 'create-power1', jwt(), power1TariffController.create);

     /**
      * Update
      * Param : id
      * Body : reqCreateGenerationSharing.dto
      */
     app.put(TARIFF + 'update-power1', jwt(), power1TariffController.update);


    /**
     * Update
     * Param : id
     * Body : reqCreateClimateSharing.dto
     */
    // app.put(TARIFF + 'update-weather',tariffController.updateWeather);


    // app.post(TARIFF + 'get-weather-list-by-Date', tariffController.getWeatherListByDate);

    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
     app.post(TARIFF + 'get-tariff-list-pageable-by-filter', 
     jwt(),
     tariffController.getListPageableByFilter);

         /**
     * Get one
     * Param : id
     */
    app.get(TARIFF + 'get-one', jwt(), tariffController.getOne);


    /**
     * Get list pageable by filter
     * Param : page,size
     * Body :
     */
    //  app.post(TARIFF + 'get-weather-list-by-yaer', 
    //  jwt(),
    //  waetherListController.getListPageableByFilter);
    };
