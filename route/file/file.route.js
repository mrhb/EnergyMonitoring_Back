/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = (app) => {

    const path = require('path');
    const jwt = require('../../middleware/auth/jwt');
    const hasRole = require('../../middleware/auth/preAuthorize');
    const config = require('../../config/config');
    const FILE = config.API + 'file/';
    const APP_DIR = path.dirname(require.main.filename);

    const fileController = require('../../controller/file/file.controller');

    app.get(FILE + 'get', (req, res) => {
        res.sendFile( req.query.link);
    });

    app.post(FILE + 'upload', jwt(), fileController.upload);

};
