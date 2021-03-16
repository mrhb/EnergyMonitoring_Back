/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const climateReceiptDao = require('../dao/climateReceipt.dao');
const climateSharingDao = require('../dao/climateSharing.dao');
const Response = require('../../../middleware/response/response-handler');
const ResponsePageable = require('../../../middleware/response/responsePageable-handler');
const ReqCreateClimateReceipt = require('./dto/reqCreateClimateReceipt.dto');
const ClimateReceipt = require('../model/climateReceipt.model');

exports.create = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.body.climateSharingId) {
        throw next("شناسه اقلیم نمی تواند خالی باشد.");
    }

    let climateSharing = await climateSharingDao
        .getOne(req.body.climateSharingId)
        .then(result => {
            return result;
        });
    console.log(climateSharing);
    if (climateSharing === null) {
        throw next("اشتراک اقلیم انتخابی صحیح نمیباشد.");
    }

    let reqCreateClimateReceipt = new ReqCreateClimateReceipt(req.body, req.user.id, climateSharing, next);


    let climateReceipt = new ClimateReceipt(reqCreateClimateReceipt);
    console.log(climateReceipt);

    climateReceiptDao
        .create(climateReceipt)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد اقلیم خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.query.id) {
        throw next("شناسه اقلیم نمی تواند خالی باشد.");
    }
    if (!req.body.climateSharingId) {
        throw next("شناسه اقلیم نمی تواند خالی باشد.");
    }

    let climateSharing = await climateSharingDao
        .getOne(req.body.climateSharingId)
        .then(result => {
            return result;
        });
    if (climateSharing === null) {
        throw next("شناسه اقلیم انتخابی صحیح نمیباشد.");
    }

    let reqCreateClimateReceipt = new ReqCreateClimateReceipt(req.body, req.user.id, climateSharing, next);

    climateReceiptDao
        .update(req.query.id, reqCreateClimateReceipt)
        .then(result => {
            if (result) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش اقلیم خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اقلیم نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    climateReceiptDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف اقلیم خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اقلیم نمی تواند خالی باشد.");
    }

    let climateReceipt = await climateReceiptDao
    .getOne(req.query.id)
    .then(result => {
        return result;
    }).catch(err => console.log(err));
    console.log(climateReceipt);

    if (climateReceipt === null) {
        throw next('این قبض موجود نیست.');
    }

    if (climateReceipt.climateSharingId) {

        let climateSharing = await climateSharingDao
        .getOne(climateReceipt.climateSharingId)
        .then(result => {
            return result;
        });
    console.log(climateSharing);

    climateReceipt.climateSharing=climateSharing;

    if (climateSharing === null) {
        throw next("شناسه اقلیم ثبت شده صحیح نمیباشد.");
    }

    }

    res.send(Response(climateReceipt));


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

    let climateReceiptList = await climateReceiptDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (climateReceiptList === null || climateReceiptList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let climateReceiptListCount = await climateReceiptDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (climateReceiptListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(climateReceiptList, climateReceiptListCount, page, size));
};
