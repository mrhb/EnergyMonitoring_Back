/**
 * @author MjImani
 * phone : +989035074205
 */

const powerSharingDao = require('../../dao/sharing/powerSharing.dao');
const Response = require('../../middleware/response/response-handler');
const ReqCreatePowerSharing = require('./dto/reqCreatePowerSharing.dto');
const PowerSharing = require('../../model/sharing/powerSharing.model');



exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreatePowerSharing = new ReqCreatePowerSharing(req.body, req.user.id, next);

    let powerSharing = new PowerSharing(reqCreatePowerSharing);
    console.log(powerSharing);

    powerSharingDao
        .create(reqCreatePowerSharing)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد اشتراک برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreatePowerSharing = new ReqCreatePowerSharing(req.body, req.user.id, next);
    powerSharingDao
        .update(req.query.id, reqCreatePowerSharing)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در آپدیت اشتراک برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    powerSharingDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف اشتراک برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};
