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

};
