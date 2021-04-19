/**
 * @author MjImani
 * phone : +989035074205
 */

const energyReceiptDao = require('../../dao/receipt/energyReceipt.dao');
const sharingDao = require('../../dao/sharing/energySharing.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const ReqCreateEnergyReceipt = require('./dto/reqCreateEnergyReceipt.dto');
const EnergyReceipt = require('../../model/receipt/energyReceipt.model');


exports.create = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.body.sharingId) {
        throw next("شناسه اشتراک انرژی نمیتواند خالی باشد.");
    }

    let sharing = await sharingDao
        .getOne(req.body.sharingId)
        .then(result => {
            return result;
        });
    console.log(sharing);
    if (sharing === null) {
        throw next("اشتراک انرژی انتخابی صحیح نمیباشد.");
    }

    let reqCreateEnergyReceipt = new ReqCreateEnergyReceipt(req.body, req.user.id, sharing, next);


    let energyReceipt = new EnergyReceipt(reqCreateEnergyReceipt);
    console.log(energyReceipt);

    energyReceiptDao
        .create(energyReceipt)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد قبض انرژی خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.query.id) {
        throw next("شناسه قبض انرژی نمیتواند خالی باشد.");
    }
    if (!req.body.sharingId) {
        throw next("شناسه اشتراک انرژی نمیتواند خالی باشد.");
    }

    let sharing = await sharingDao
        .getOne(req.body.sharingId)
        .then(result => {
            return result;
        });
    if (sharing === null) {
        throw next("اشتراک انرژی انتخابی صحیح نمیباشد.");
    }

    let reqCreateEnergyReceipt = new ReqCreateEnergyReceipt(req.body, req.user.id, sharing, next);

    energyReceiptDao
        .update(req.query.id, reqCreateEnergyReceipt)
        .then(result => {
            if (result) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش قبض انرژی خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه قبض انرژی نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    energyReceiptDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف قبض انرژی خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه قبض انرژی نمیتواند خالی باشد.");
    }

    let energyReceipt = await energyReceiptDao
    .getOne(req.query.id)
    .then(result => {
        return result;
    }).catch(err => console.log(err));
    console.log(energyReceipt);

    if (energyReceipt === null) {
        throw next('این قبض موجود نیست.');
    }

    if (energyReceipt.sharingId) {

        let sharing = await sharingDao
        .getOne(energyReceipt.sharingId)
        .then(result => {
            return result;
        });
    console.log(sharing);

    energyReceipt.sharing=sharing;

    if (sharing === null) {
        throw next("اشتراک انرژی ثبت شده صحیح نمیباشد.");
    }

    }

    res.send(Response(energyReceipt));


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

    let energyReceiptList = await energyReceiptDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (energyReceiptList === null || energyReceiptList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let energyReceiptListCount = await energyReceiptDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (energyReceiptListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(energyReceiptList, energyReceiptListCount, page, size));
};
