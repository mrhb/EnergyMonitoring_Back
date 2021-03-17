/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */

const facilitySharingDao = require('../dao/facilitySharing.dao');
const buildingDao = require('../../../dao/building/building.dao');
const Response = require('../../../middleware/response/response-handler');
const ResponsePageable = require('../../../middleware/response/responsePageable-handler');
const ReqCreatefacilitySharing = require('./dto/reqCreatefacilitySharing.dto');
const facilitySharing = require('../model/facilitySharing.model');
const ReqBuildingAllocation = require('./dto/reqBuildingAllocation.dto');


exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreatefacilitySharing = new ReqCreatefacilitySharing(req.body, req.user.id, next);

    let facilitySharing = new facilitySharing(reqCreatefacilitySharing);
    console.log(facilitySharing);

    facilitySharingDao
        .create(facilitySharing)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            return  next("در ایجاد تاسیس خطایی رخ داده است.");
        }).catch(err => {console.log('here ' + err);throw next(err)});
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تاسیس نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreatefacilitySharing = new ReqCreatefacilitySharing(req.body, req.user.id, next);
    facilitySharingDao
        .update(req.query.id, reqCreatefacilitySharing)
        .then(result => {
            if (result !== null) {
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
        throw next("شناسه تاسیس نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    facilitySharingDao
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
        throw next("شناسه تاسیس نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let facilitySharing = await facilitySharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    console.log(facilitySharing);

    if (facilitySharing === null) {
        throw next('محتوایی برای نمایش موجود نیست.');
    }

    if (facilitySharing.buildingList.length > 0) {
        let buildingIdList = [];
        facilitySharing.buildingList.forEach(item => {
            buildingIdList.push(item.buildingId);
        });

        let buildingList = await buildingDao
            .getListByIdList(buildingIdList)
            .then(result => {
                return result;
            }).catch(err => console.log(err));
        console.log(buildingList);

        facilitySharing.buildingList.forEach(item => {
            buildingList.forEach(building => {


                if (item.buildingId === building._id.toString()) {
                    console.log(typeof item.buildingId);
                    console.log(typeof building._id.toString());
                    item.name = building.name;
                    item.consumptionType = building.consumptionType;
                    item.postalCode = building.postalCode;
                }
            })
        });
    }
    res.send(Response(facilitySharing));
};

exports.addBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تاسیس نمیتواند خالی باشد.");
    }

    // Is there an facility sharing for this building?
    let isTherefacility = await facilitySharingDao
        .isThereBuilding(null,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isTherefacility === true){
        throw next('برای ساختمان انتخابی تاسیس انتخاب شده است.')
    }

    let facilitySharing = await facilitySharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    if (facilitySharing.buildingList.length > 0) {
        let allocationPercentageSum = 0;
        for (let i = 0; i < facilitySharing.buildingList.length; i++) {
            allocationPercentageSum = allocationPercentageSum + Number(facilitySharing.buildingList[i].allocationPercentage);
        }
        allocationPercentageSum = allocationPercentageSum + Number(req.body.allocationPercentage);
        if (allocationPercentageSum > 100) {
            throw next('درصد های تخصیص بیشتر از 100 شده است.')
        }
    }else {
        if (req.body.allocationPercentage > 100) {
            throw next('درصد تخصیص بیشتر از 100 انتخاب شده است.')
        }
    }
    let reqBuildingAllocation = new ReqBuildingAllocation(req.body, true, next);
    let buildingAllocation = await facilitySharingDao
        .addBuildingAllocation(req.query.id, reqBuildingAllocation)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    return true;
                }else {
                    return false;
                }
            }
            return null;
        }).catch(err => console.log(err));

    if (buildingAllocation === null || buildingAllocation === false) {
        throw next("در اضافه کردن ساختمان به اشتراک خطایی رخ داده است.");
    }

    let building = await buildingDao
        .getOne(reqBuildingAllocation.buildingId)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    reqBuildingAllocation.name = building.name;
    reqBuildingAllocation.id = reqBuildingAllocation._id;
    reqBuildingAllocation.consumptionType = building.consumptionType;
    reqBuildingAllocation.postalCode = building.postalCode;
    delete reqBuildingAllocation._id;
    res.send(Response(reqBuildingAllocation));
};

exports.updateBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تاسیس نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    // Is there an facility sharing for this building?
    let isTherefacility = await facilitySharingDao
        .isThereBuilding(req.query.id,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isTherefacility === true){
        throw next('برای ساختمان انتخابی تاسیس انتخاب شده است.')
    }

    let facilitySharing = await facilitySharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });

    if (facilitySharing.buildingList.length > 0) {
        let allocationPercentageSum = Number(req.body.allocationPercentage);
        for (let i = 0; i < facilitySharing.buildingList.length; i++) {
            if (facilitySharing.buildingList[i].id === req.body.id) {
                continue;
            }
            allocationPercentageSum = allocationPercentageSum + Number(facilitySharing.buildingList[i].allocationPercentage);
        }
        if (allocationPercentageSum > 100) {
            throw next('درصد های تخصیص بیشتر از 100 شده است.')
        }
    }else {
        if (req.body.allocationPercentage > 100) {
            throw next('درصد تخصیص بیشتر از 100 انتخاب شده است.')
        }
    }
    let reqBuildingAllocation = new ReqBuildingAllocation(req.body, false, next);
    facilitySharingDao
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
        throw next("شناسه تاسیس نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.allocationId) {
        throw next("شناسه ساختمان اختصاص یافته نمیتواند خالی باشد.");
    }
    console.log('query allocationId ' + req.query.allocationId);

    facilitySharingDao
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

    let facilitySharingList = await facilitySharingDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilitySharingList === null || facilitySharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let facilitySharingListCount = await facilitySharingDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilitySharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(facilitySharingList, facilitySharingListCount, page, size));
};


exports.getListPageableByTerm = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.page) {
        throw next("شماره صفحه نمیتواند خالی باشد.");
    }
    let page = Number(req.query.page);
    if (!req.query.size) {
        throw next("اندازه صفحه نمیتواند خالی باشد.");
    }
    let size = Number(req.query.size);

    let facilitySharingList = await facilitySharingDao
        .getListPageableByTerm(req.body, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilitySharingList === null || facilitySharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let facilitySharingListCount = await facilitySharingDao
        .getListPageableByTermCount(req.body)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilitySharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(facilitySharingList, facilitySharingListCount, page, size));
};
