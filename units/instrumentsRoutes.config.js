const instrumentsController = require('./controllers/instruments.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;
const baseUrl='/api/instruments';
exports.routesConfig = function (app) {
    app.post(baseUrl, [
        instrumentsController.insert
    ]);
    app.get(baseUrl, [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        instrumentsController.list
    ]);
    app.get(baseUrl+'/:id', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        instrumentsController.getById
    ]);
    app.patch(baseUrl+'/:id', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        instrumentsController.patchById
    ]);
    app.delete(baseUrl+'/:id', [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        instrumentsController.removeById
    ]);
};
