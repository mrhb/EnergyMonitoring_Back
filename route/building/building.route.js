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

    app.get(REGION + 'get-list-by-parent-id/:parentId', jwt(), buildingController.create);

};
