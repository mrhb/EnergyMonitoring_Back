/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let GAS_SHARING = config.API + 'gas-sharing/';

    let gasSharingController = require('../../controller/sharing/gasSharing.controller');

    app.post(GAS_SHARING + 'create', jwt(), gasSharingController);

};
