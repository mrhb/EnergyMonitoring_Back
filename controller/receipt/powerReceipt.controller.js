/**
 * @author MjImani
 * phone : +989035074205
 */

const powerReceiptDao = require('../../dao/receipt/powerReceipt.dao');
const powerSharingDao = require('../../dao/sharing/powerSharing.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const ReqCreatePowerReceipt = require('./dto/reqCreatePowerReceipt.dto');
const PowerReceipt = require('../../model/receipt/powerReceipt.model');


exports.create = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.body.powerSharingId) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }

    let powerSharing = await powerSharingDao
        .getOne(req.body.powerSharingId)
        .then(result => {
            return result;
        });
    console.log(powerSharing);
    if (powerSharing === null) {
        throw next("اشتراک برق انتخابی صحیح نمیباشد.");
    }

    let reqCreatePowerReceipt = new ReqCreatePowerReceipt(req.body, req.user.id, powerSharing, next);


    let powerReceipt = new PowerReceipt(reqCreatePowerReceipt);
    console.log(powerReceipt);

    powerReceiptDao
        .create(powerReceipt)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد قبض برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};
