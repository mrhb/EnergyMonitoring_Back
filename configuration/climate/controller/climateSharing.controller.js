/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const climateSharingDao = require('../dao/climateSharing.dao');
const buildingDao = require('../../../dao/building/building.dao');
const Response = require('../../../middleware/response/response-handler');
const ResponsePageable = require('../../../middleware/response/responsePageable-handler');
const ReqCreateClimateSharing = require('./dto/reqCreateClimateSharing.dto');
const ClimateSharing = require('../model/climateSharing.model');
const ReqBuildingAllocation = require('./dto/reqBuildingAllocation.dto');


exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateClimateSharing = new ReqCreateClimateSharing(req.body, req.user.id, next);

    let climateSharing = new ClimateSharing(reqCreateClimateSharing);
    console.log(climateSharing);

    climateSharingDao
        .create(climateSharing)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            return  next("در ایجاد اقلیم خطایی رخ داده است.");
        }).catch(err => {console.log('here ' + err);throw next(err)});
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreateClimateSharing = new ReqCreateClimateSharing(req.body, req.user.id, next);
    climateSharingDao
        .update(req.query.id, reqCreateClimateSharing)
        .then(result => {
            if (result !== null) {
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
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    climateSharingDao
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
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let climateSharing = await climateSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    console.log(climateSharing);

    if (climateSharing === null) {
        throw next('محتوایی برای نمایش موجود نیست.');
    }

    if (climateSharing.buildingList.length > 0) {
        let buildingIdList = [];
        climateSharing.buildingList.forEach(item => {
            buildingIdList.push(item.buildingId);
        });

        let buildingList = await buildingDao
            .getListByIdList(buildingIdList)
            .then(result => {
                return result;
            }).catch(err => console.log(err));
        console.log(buildingList);

        climateSharing.buildingList.forEach(item => {
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
    res.send(Response(climateSharing));
};

exports.addBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }

    // Is there an climate sharing for this building?
    let isThereClimate = await climateSharingDao
        .isThereBuilding(null,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isThereClimate === true){
        throw next('برای ساختمان انتخابی اقلیم انتخاب شده است.')
    }

    let climateSharing = await climateSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    if (climateSharing.buildingList.length > 0) {
        let allocationPercentageSum = 0;
        for (let i = 0; i < climateSharing.buildingList.length; i++) {
            allocationPercentageSum = allocationPercentageSum + Number(climateSharing.buildingList[i].allocationPercentage);
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
    let buildingAllocation = await climateSharingDao
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
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    // Is there an climate sharing for this building?
    let isThereClimate = await climateSharingDao
        .isThereBuilding(req.query.id,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isThereClimate === true){
        throw next('برای ساختمان انتخابی اقلیم انتخاب شده است.')
    }

    let climateSharing = await climateSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });

    if (climateSharing.buildingList.length > 0) {
        let allocationPercentageSum = Number(req.body.allocationPercentage);
        for (let i = 0; i < climateSharing.buildingList.length; i++) {
            if (climateSharing.buildingList[i].id === req.body.id) {
                continue;
            }
            allocationPercentageSum = allocationPercentageSum + Number(climateSharing.buildingList[i].allocationPercentage);
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
    climateSharingDao
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
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.allocationId) {
        throw next("شناسه ساختمان اختصاص یافته نمیتواند خالی باشد.");
    }
    console.log('query allocationId ' + req.query.allocationId);

    climateSharingDao
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

    let climateSharingList = await climateSharingDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (climateSharingList === null || climateSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let climateSharingListCount = await climateSharingDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (climateSharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(climateSharingList, climateSharingListCount, page, size));
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

    let climateSharingList = await climateSharingDao
        .getListPageableByTerm(req.body, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (climateSharingList === null || climateSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let climateSharingListCount = await climateSharingDao
        .getListPageableByTermCount(req.body)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (climateSharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(climateSharingList, climateSharingListCount, page, size));
};
