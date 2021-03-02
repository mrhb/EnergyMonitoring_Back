/**
 * @author MjImani
 * phone : +989035074205
 */

const waterReceiptDao = require('../../dao/receipt/waterReceipt.dao');
const waterSharingDao = require('../../dao/sharing/waterSharing.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const ReqCreateWaterReceipt = require('./dto/reqCreateWaterReceipt.dto');
const WaterReceipt = require('../../model/receipt/waterReceipt.model');


exports.create = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.body.waterSharingId) {
        throw next("شناسه اشتراک آب نمیتواند خالی باشد.");
    }

    let waterSharing = await waterSharingDao
        .getOne(req.body.waterSharingId)
        .then(result => {
            return result;
        });
    console.log(waterSharing);
    if (waterSharing === null) {
        throw next("اشتراک آب انتخابی صحیح نمیباشد.");
    }

    let reqCreateWaterReceipt = new ReqCreateWaterReceipt(req.body, req.user.id, waterSharing, next);


    let waterReceipt = new WaterReceipt(reqCreateWaterReceipt);
    console.log(waterReceipt);

    waterReceiptDao
        .create(waterReceipt)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد قبض آب خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.query.id) {
        throw next("شناسه قبض آب نمیتواند خالی باشد.");
    }
    if (!req.body.waterSharingId) {
        throw next("شناسه اشتراک آب نمیتواند خالی باشد.");
    }

    let waterSharing = await waterSharingDao
        .getOne(req.body.waterSharingId)
        .then(result => {
            return result;
        });
    if (waterSharing === null) {
        throw next("اشتراک آب انتخابی صحیح نمیباشد.");
    }

    let reqCreateWaterReceipt = new ReqCreateWaterReceipt(req.body, req.user.id, waterSharing, next);

    waterReceiptDao
        .update(req.query.id, reqCreateWaterReceipt)
        .then(result => {
            if (result) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش قبض آب خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه قبض آب نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    waterReceiptDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف قبض آب خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه قبض آب نمیتواند خالی باشد.");
    }

    let waterReceipt = await waterReceiptDao
    .getOne(req.query.id)
    .then(result => {
        return result;
    }).catch(err => console.log(err));
    console.log(waterReceipt);

    if (waterReceipt === null) {
        throw next('این قبض موجود نیست.');
    }

    if (waterReceipt.waterSharingId) {

        let waterSharing = await waterSharingDao
        .getOne(waterReceipt.waterSharingId)
        .then(result => {
            return result;
        });
    console.log(waterSharing);

    waterReceipt.waterSharing=waterSharing;

    if (waterSharing === null) {
        throw next("اشتراک آب ثبت شده صحیح نمیباشد.");
    }

    }

    res.send(Response(waterReceipt));


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

    let waterReceiptList = await waterReceiptDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (waterReceiptList === null || waterReceiptList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let waterReceiptListCount = await waterReceiptDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (waterReceiptListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(waterReceiptList, waterReceiptListCount, page, size));
};
