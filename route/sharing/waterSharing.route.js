/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let WATER_SHARING = config.API + 'water-sharing/';

    let waterSharingController = require('../../controller/sharing/waterSharing.controller');

    app.post(WATER_SHARING + 'create', jwt(), waterSharingController);

};
