/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    // let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config.json');
    let REGION = config.API + 'region/';

    let regionController = require('./region.controller');

    app.get(REGION + 'get-list-by-parent-id/:parentId', jwt(), regionController.getListByParentId);

     /**
     * Create
     * Body : reqCreatePowerReceipt.dto
     */
      app.post(REGION + 'create', jwt(), regionController.create);

      /**
       * Update
       * Param : id
       * Body : reqCreatePowerReceipt.dto
       */
      app.put(REGION + 'update', jwt(), regionController.update);
  
          /**
       * Delete
       * Param : id
       */
      app.delete(REGION + 'delete', jwt(), regionController.delete);
};
