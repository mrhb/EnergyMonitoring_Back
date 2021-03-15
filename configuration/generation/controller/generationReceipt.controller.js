/**
 * @author MjImani
 * phone : +989035074205
 */

const generationReceiptDao = require('../dao/generationReceipt.dao');
const generationSharingDao = require('../dao/generationSharing.dao');
const Response = require('../../../middleware/response/response-handler');
const ResponsePageable = require('../../../middleware/response/responsePageable-handler');
const ReqCreateGenerationReceipt = require('./dto/reqCreateGenerationReceipt.dto');
const GenerationReceipt = require('../model/generationReceipt.model');



exports.create = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.body.generationSharingId) {
        throw next("شناسه نیروگاه نمی تواند خالی باشد.");
    }

    let generationSharing = await generationSharingDao
        .getOne(req.body.generationSharingId)
        .then(result => {
            return result;
        });
    console.log(generationSharing);
    if (generationSharing === null) {
        throw next("اشتراک نیروگاه انتخابی صحیح نمیباشد.");
    }

    let reqCreateGenerationReceipt = new ReqCreateGenerationReceipt(req.body, req.user.id, generationSharing, next);


    let generationReceipt = new GenerationReceipt(reqCreateGenerationReceipt);
    console.log(generationReceipt);

    generationReceiptDao
        .create(generationReceipt)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد نیروگاه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.query.id) {
        throw next("شناسه نیروگاه نمی تواند خالی باشد.");
    }
    if (!req.body.generationSharingId) {
        throw next("شناسه نیروگاه نمی تواند خالی باشد.");
    }

    let generationSharing = await generationSharingDao
        .getOne(req.body.generationSharingId)
        .then(result => {
            return result;
        });
    if (generationSharing === null) {
        throw next("شناسه نیروگاه انتخابی صحیح نمیباشد.");
    }

    let reqCreateGenerationReceipt = new ReqCreateGenerationReceipt(req.body, req.user.id, generationSharing, next);

    generationReceiptDao
        .update(req.query.id, reqCreateGenerationReceipt)
        .then(result => {
            if (result) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش نیروگاه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه نیروگاه نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    generationReceiptDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف نیروگاه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه نیروگاه نمی تواند خالی باشد.");
    }

    let generationReceipt = await generationReceiptDao
    .getOne(req.query.id)
    .then(result => {
        return result;
    }).catch(err => console.log(err));
    console.log(generationReceipt);

    if (generationReceipt === null) {
        throw next('این قبض موجود نیست.');
    }

    if (generationReceipt.generationSharingId) {

        let generationSharing = await generationSharingDao
        .getOne(generationReceipt.generationSharingId)
        .then(result => {
            return result;
        });
    console.log(generationSharing);

    generationReceipt.generationSharing=generationSharing;

    if (generationSharing === null) {
        throw next("شناسه نیروگاه ثبت شده صحیح نمیباشد.");
    }

    }

    res.send(Response(generationReceipt));


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

    let generationReceiptList = await generationReceiptDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (generationReceiptList === null || generationReceiptList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let generationReceiptListCount = await generationReceiptDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (generationReceiptListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(generationReceiptList, generationReceiptListCount, page, size));
};
