/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    let jwt = require('../../middleware/auth/jwt');
    let hasRole = require('../../middleware/auth/preAuthorize');
    let config = require('../../config/config');
    let ENERGY_SHARING = config.API + 'energy-sharing/';

    let energySharingController = require('../../controller/sharing/energySharing.controller');

    app.post(ENERGY_SHARING + 'create', jwt(), energySharingController);

};
