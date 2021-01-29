/**
 * @author MjImani
 * phone : +989035074205
 */

const gasSharingDao = require('../../dao/sharing/gasSharing.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const GasSharing = require('../../model/sharing/gasSharing.model');
const ReqCreateGasSharing = require('./dto/reqCreateGasSharing.dto');
const ReqBuildingAllocation = require('./dto/reqBuildingAllocation.dto');


exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateGasSharing = new ReqCreateGasSharing(req.body, req.user.id, next);

    let gasSharing = new GasSharing(reqCreateGasSharing);

    gasSharingDao
        .create(gasSharing)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد اشتراک گاز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreateGasSharing = new ReqCreateGasSharing(req.body, req.user.id, next);
    gasSharingDao
        .update(req.query.id, reqCreateGasSharing)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در آپدیت اشتراک گاز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    gasSharingDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف اشتراک گاز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    gasSharingDao
        .getOne(req.query.id)
        .then(result => {
            if (result !== null) {
                res.send(Response(result));
                return;
            }
            throw next("موردی یافت نشد");
        }).catch(err => console.log(err));
};

exports.addBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }

    let gasSharing = await gasSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    if (gasSharing.buildingList.length > 0) {
        let allocationPercentageSum = 0;
        for (let i = 0; i < gasSharing.buildingList.length; i++) {
            allocationPercentageSum = allocationPercentageSum + Number(gasSharing.buildingList[i].allocationPercentage);
        }
        if (allocationPercentageSum >= 100) {
            throw next('درصد های تخصیص بیشتر از 100 شده است.')
        }
    }
    let reqBuildingAllocation = new ReqBuildingAllocation(req.body, true, next);
    gasSharingDao
        .addBuildingAllocation(req.query.id, reqBuildingAllocation)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(reqBuildingAllocation._id));
                    return;
                }
            }
            throw next("در اضافه کردن ساختمان به اشتراک خطایی رخ داده است.");
        }).catch(err => console.log(err));

};

exports.updateBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    let gasSharing = await gasSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    console.log(gasSharing.buildingList[0].id);

    if (gasSharing.buildingList.length > 0) {
        let allocationPercentageSum = Number(req.body.allocationPercentage);
        for (let i = 0; i < gasSharing.buildingList.length; i++) {
            if (gasSharing.buildingList[i].id === req.body.id) {
                continue;
            }
            allocationPercentageSum = allocationPercentageSum + Number(gasSharing.buildingList[i].allocationPercentage);
        }
        if (allocationPercentageSum >= 100) {
            throw next('درصد های تخصیص بیشتر از 100 شده است.')
        }
    }

    let reqBuildingAllocation = new ReqBuildingAllocation(req.body, false, next);
    gasSharingDao
        .updateBuildingAllocation(req.query.id, reqBuildingAllocation)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                } else {
                    res.send(Response(false));
                    return;
                }
            }
            throw next("در ویرایش اطلاعات خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.deleteBuildingAllocation = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.allocationId) {
        throw next("شناسه ساختمان اختصاص یافته نمیتواند خالی باشد.");
    }
    console.log('query allocationId ' + req.query.allocationId);

    gasSharingDao
        .deleteBuildingAllocation(req.query.id, req.query.allocationId)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                } else {
                    res.send(Response(false));
                    return;
                }
            }
            throw next("در حذف کردن ساختمان اختصاص یافته خطایی رخ داده است.");
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

    let gasSharingList = await gasSharingDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (gasSharingList === null || gasSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let gasSharingListCount = await gasSharingDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (gasSharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(gasSharingList, gasSharingListCount, page, size));
};

