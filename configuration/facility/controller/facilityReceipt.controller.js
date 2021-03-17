/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */

const facilityReceiptDao = require('../dao/facilityReceipt.dao');
const facilitySharingDao = require('../dao/facilitySharing.dao');
const Response = require('../../../middleware/response/response-handler');
const ResponsePageable = require('../../../middleware/response/responsePageable-handler');
const ReqCreatefacilityReceipt = require('./dto/reqCreatefacilityReceipt.dto');
const facilityReceipt = require('../model/facilityReceipt.model');


name: string; //نام تاسیس 
facilityUsage: FacilityUsage; // نوع کاربری 
CapacitorBank: string; // بانک خازنی 
explanation: string; //توضیحات
address: string; //آدرس
regionId: string;

exports.create = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.body.facilitySharingId) {
        throw next("شناسه تاسیس نمی تواند خالی باشد.");
    }

    let facilitySharing = await facilitySharingDao
        .getOne(req.body.facilitySharingId)
        .then(result => {
            return result;
        });
    console.log(facilitySharing);
    if (facilitySharing === null) {
        throw next("شناسه تاسیس انتخابی صحیح نمیباشد.");
    }

    let reqCreatefacilityReceipt = new ReqCreatefacilityReceipt(req.body, req.user.id, facilitySharing, next);


    let facilityReceipt = new facilityReceipt(reqCreatefacilityReceipt);
    console.log(facilityReceipt);

    facilityReceiptDao
        .create(facilityReceipt)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد تاسیس خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.query.id) {
        throw next("شناسه تاسیس نمی تواند خالی باشد.");
    }
    if (!req.body.facilitySharingId) {
        throw next("شناسه تاسیس نمی تواند خالی باشد.");
    }

    let facilitySharing = await facilitySharingDao
        .getOne(req.body.facilitySharingId)
        .then(result => {
            return result;
        });
    if (facilitySharing === null) {
        throw next("شناسه تاسیس انتخابی صحیح نمیباشد.");
    }

    let reqCreatefacilityReceipt = new ReqCreatefacilityReceipt(req.body, req.user.id, facilitySharing, next);

    facilityReceiptDao
        .update(req.query.id, reqCreatefacilityReceipt)
        .then(result => {
            if (result) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش تاسیس خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تاسیس نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    facilityReceiptDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف تاسیس خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تاسیس نمی تواند خالی باشد.");
    }

    let facilityReceipt = await facilityReceiptDao
    .getOne(req.query.id)
    .then(result => {
        return result;
    }).catch(err => console.log(err));
    console.log(facilityReceipt);

    if (facilityReceipt === null) {
        throw next('این تولید موجود نیست.');
    }

    if (facilityReceipt.facilitySharingId) {

        let facilitySharing = await facilitySharingDao
        .getOne(facilityReceipt.facilitySharingId)
        .then(result => {
            return result;
        });
    console.log(facilitySharing);

    facilityReceipt.facilitySharing=facilitySharing;

    if (facilitySharing === null) {
        throw next("شناسه تاسیس ثبت شده صحیح نمیباشد.");
    }

    }

    res.send(Response(facilityReceipt));


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

    let facilityReceiptList = await facilityReceiptDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilityReceiptList === null || facilityReceiptList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let facilityReceiptListCount = await facilityReceiptDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilityReceiptListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(facilityReceiptList, facilityReceiptListCount, page, size));
};
