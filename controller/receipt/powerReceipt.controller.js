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

exports.update = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.query.id) {
        throw next("شناسه قبض برق نمیتواند خالی باشد.");
    }
    if (!req.body.powerSharingId) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }

    let powerSharing = await powerSharingDao
        .getOne(req.body.powerSharingId)
        .then(result => {
            return result;
        });
    if (powerSharing === null) {
        throw next("اشتراک برق انتخابی صحیح نمیباشد.");
    }

    let reqCreatePowerReceipt = new ReqCreatePowerReceipt(req.body, req.user.id, powerSharing, next);

    powerReceiptDao
        .update(req.query.id, reqCreatePowerReceipt)
        .then(result => {
            if (result) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش قبض برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه قبض برق نمیتواند خالی باشد.");
    }
    powerReceiptDao
        .getOne(req.query.id)
        .then(result => {
            res.send(Response(result));
        }).catch(err => console.log(err));
};

exports.getListPageableByFilter = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.page) {
        throw next("شماره صفحه نمیتواند خالی باشد.");
    }
    let page = Number(req.query.page);
    if (!req.query.size) {
        throw next("اندازه صفحه نمیتواند خالی باشد.");
    }
    let size = Number(req.query.size);

    let powerReceiptList = await powerReceiptDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (powerReceiptList === null || powerReceiptList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let powerReceiptListCount = await powerReceiptDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (powerReceiptListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(powerReceiptList, powerReceiptListCount, page, size));
};
