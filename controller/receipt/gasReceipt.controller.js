/**
 * @author MjImani
 * phone : +989035074205
 */

const gasReceiptDao = require('../../dao/receipt/gasReceipt.dao');
const regionDao=require('../../configuration/region/region.dao');
const ReqFilterDto = require('./dto/reqFilter.dto');

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


    let gasReceipt = new GasReceipt(reqCreateGasReceipt);
    console.log(gasReceipt);

    gasReceiptDao
        .create(gasReceipt)
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

exports.createMulti = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    let gasReceiptList = req.body;

    if (gasReceiptList == null){
        throw next("لیست خالی میباشد.");
    }

    let billingIdList = [];
    gasReceiptList.forEach(item => {
        billingIdList.push(item.billingId);
    });

    let gasSharingList = await gasSharingDao
        .getListBybillingIdList(billingIdList)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    gasReceiptList.forEach(gasReceipt => {
        gasSharingList.forEach(sharing => {
            if (gasReceipt.billingId === sharing.billingId){
                gasReceipt.sharingId = sharing._id;
                gasReceipt.creatorId = req.user.id;
                gasReceipt.ownerId = req.user.id;
            }
        });
    });

    gasReceiptDao
        .create(gasReceiptList)
        .then(result => {
            console.log("my res");
            console.log(result);
            if (result) {
                if (result[0]._id) {
                    res.send(Response(true));
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

    gasReceiptDao
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

    gasReceiptDao
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

    let gasReceipt = await gasReceiptDao
    .getOne(req.query.id)
    .then(result => {
        return result;
    }).catch(err => console.log(err));
    console.log(gasReceipt);

    if (gasReceipt === null) {
        throw next('این قبض موجود نیست.');
    }

    if (gasReceipt.sharingId) {

        let sharing = await gasSharingDao
        .getOne(gasReceipt.sharingId)
        .then(result => {
            return result;
        });
    console.log(sharing);

    gasReceipt.sharing=sharing;

    if (sharing === null) {
        throw next("اشتراک گاز ثبت شده صحیح نمیباشد.");
    }

    }

    res.send(Response(gasReceipt));


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

    let filter = new ReqFilterDto(req.body, next);


      let regionIds = await regionDao
        .getChildsById(filter.regionId)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

        filter.regionIds=regionIds.reduce((acc,val)=>{
            acc.push(val._id)
            return acc
        },[]);
        filter.regionIds.push(filter.regionId);

        
    let result = await gasReceiptDao
    .getListPageableByFilter(filter,page, size)
    .then(result => {
        return result;
    }).catch(err => console.log(err));

    let ReceiptList =result[0].paginatedResults;
    
    if (ReceiptList === null || ReceiptList.length <= 0) {
        res.send(Response(null));
        return;
    }

let ReceiptListCount = result[0].totalCount[0].count;


res.send(ResponsePageable(ReceiptList, ReceiptListCount, page, size));
};