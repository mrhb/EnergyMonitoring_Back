/**
 * @author MjImani
 * phone : +989035074205
 */

const gazReceiptDao = require('../../dao/receipt/gazReceipt.dao');
const gasSharingDao = require('../../dao/sharing/gasSharing.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const ReqCreateGasReceipt = require('./dto/reqCreateGasReceipt.dto');
const GasReceipt = require('../../model/receipt/gasReceipt.model');


exports.create = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.body.sharingId) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }

    let sharing = await gasSharingDao
        .getOne(req.body.sharingId)
        .then(result => {
            return result;
        });
    console.log(sharing);
    if (sharing === null) {
        throw next("اشتراک گاز انتخابی صحیح نمیباشد.");
    }

    let reqCreateGasReceipt = new ReqCreateGasReceipt(req.body, req.user.id, sharing, next);


    let gazReceipt = new GasReceipt(reqCreateGasReceipt);
    console.log(gazReceipt);

    gazReceiptDao
        .create(gazReceipt)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد قبض گاز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.query.id) {
        throw next("شناسه قبض گاز نمیتواند خالی باشد.");
    }
    if (!req.body.sharingId) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }

    let sharing = await gasSharingDao
        .getOne(req.body.sharingId)
        .then(result => {
            return result;
        });
    if (sharing === null) {
        throw next("اشتراک گاز انتخابی صحیح نمیباشد.");
    }

    let reqCreateGasReceipt = new ReqCreateGasReceipt(req.body, req.user.id, sharing, next);

    gazReceiptDao
        .update(req.query.id, reqCreateGasReceipt)
        .then(result => {
            if (result) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش قبض گاز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه قبض گاز نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    gazReceiptDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف قبض گاز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه قبض گاز نمیتواند خالی باشد.");
    }

    let gazReceipt = await gazReceiptDao
    .getOne(req.query.id)
    .then(result => {
        return result;
    }).catch(err => console.log(err));
    console.log(gazReceipt);

    if (gazReceipt === null) {
        throw next('این قبض موجود نیست.');
    }

    if (gazReceipt.sharingId) {

        let sharing = await gasSharingDao
        .getOne(gazReceipt.sharingId)
        .then(result => {
            return result;
        });
    console.log(sharing);

    gazReceipt.sharing=sharing;

    if (sharing === null) {
        throw next("اشتراک گاز ثبت شده صحیح نمیباشد.");
    }

    }

    res.send(Response(gazReceipt));


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

    let gazReceiptList = await gazReceiptDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (gazReceiptList === null || gazReceiptList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let gazReceiptListCount = await gazReceiptDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (gazReceiptListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(gazReceiptList, gazReceiptListCount, page, size));
};
