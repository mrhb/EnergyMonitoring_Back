/**
 * @author MjImani
 * phone : +989035074205
 */

const powerSharingDao = require('../../dao/sharing/powerSharing.dao');
const buildingDao = require('../../dao/building/building.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const ReqCreatePowerSharing = require('./dto/reqCreatePowerSharing.dto');
const PowerSharing = require('../../model/sharing/powerSharing.model');
const ReqBuildingAllocation = require('./dto/reqBuildingAllocation.dto');


exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreatePowerSharing = new ReqCreatePowerSharing(req.body, req.user.id, next);

    let powerSharing = new PowerSharing(reqCreatePowerSharing);
    console.log(powerSharing);

    powerSharingDao
        .create(powerSharing)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد اشتراک برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreatePowerSharing = new ReqCreatePowerSharing(req.body, req.user.id, next);
    powerSharingDao
        .update(req.query.id, reqCreatePowerSharing)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در آپدیت اشتراک برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    powerSharingDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف اشتراک برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let powerSharing = await powerSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    console.log(powerSharing);

    if (powerSharing === null) {
        throw next('محتوایی برای نمایش موجود نیست.');
    }

    if (powerSharing.buildingList.length > 0) {
        let buildingIdList = [];
        powerSharing.buildingList.forEach(item => {
            buildingIdList.push(item.buildingId);
        });

        let buildingList = await buildingDao
            .getListByIdList(buildingIdList)
            .then(result => {
                return result;
            }).catch(err => console.log(err));
        console.log(buildingList);

        powerSharing.buildingList.forEach(item => {
            buildingList.forEach(building => {


                if (item.buildingId === building._id.toString()) {
                    console.log(typeof item.buildingId);
                    console.log(typeof building._id.toString());
                    item.name = building.name;
                    item.useType = building.useType;
                    item.postalCode = building.postalCode;
                }
            })
        });
    }
    res.send(Response(powerSharing));
};

exports.addBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }

    // Is there an power sharing for this building?
    let isTherePower = await powerSharingDao
        .isThereBuilding(null,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isTherePower === true){
        throw next('برای ساختمان انتخابی اشتراک برق انتخاب شده است.')
    }

    let powerSharing = await powerSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    // Check allocationPercentage
    if (powerSharing.buildingList.length > 0) {
        let allocationPercentageSum = 0;
        for (let i = 0; i < powerSharing.buildingList.length; i++) {
            allocationPercentageSum = allocationPercentageSum + Number(powerSharing.buildingList[i].allocationPercentage);
        }
        allocationPercentageSum = allocationPercentageSum + Number(req.body.allocationPercentage);
        if (allocationPercentageSum > 100) {
            throw next('درصد های تخصیص بیشتر از 100 شده است.')
        }
    } else {
        if (req.body.allocationPercentage > 100) {
            throw next('درصد تخصیص بیشتر از 100 انتخاب شده است.')
        }
    }
    let reqBuildingAllocation = new ReqBuildingAllocation(req.body, true, next);
    let buildingAllocation = await powerSharingDao
        .addBuildingAllocation(req.query.id, reqBuildingAllocation)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    return true;
                } else {
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
    reqBuildingAllocation.useType = building.useType;
    reqBuildingAllocation.postalCode = building.postalCode;
    delete reqBuildingAllocation._id;
    res.send(Response(reqBuildingAllocation));
};

exports.updateBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    // Is there an power sharing for this building?
    let isTherePower = await powerSharingDao
        .isThereBuilding(req.query.id,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isTherePower === true){
        throw next('برای ساختمان انتخابی اشتراک برق انتخاب شده است.')
    }

    let powerSharing = await powerSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    // Check allocationPercentage
    if (powerSharing.buildingList.length > 0) {
        let allocationPercentageSum = Number(req.body.allocationPercentage);
        for (let i = 0; i < powerSharing.buildingList.length; i++) {
            if (powerSharing.buildingList[i].id === req.body.id) {
                continue;
            }
            allocationPercentageSum = allocationPercentageSum + Number(powerSharing.buildingList[i].allocationPercentage);
        }
        if (allocationPercentageSum > 100) {
            throw next('درصد های تخصیص بیشتر از 100 شده است.')
        }
    } else {
        if (req.body.allocationPercentage > 100) {
            throw next('درصد تخصیص بیشتر از 100 انتخاب شده است.')
        }
    }

    let reqBuildingAllocation = new ReqBuildingAllocation(req.body, false, next);
    powerSharingDao
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
        throw next("شناسه اشتراک برق نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.allocationId) {
        throw next("شناسه ساختمان اختصاص یافته نمیتواند خالی باشد.");
    }
    console.log('query allocationId ' + req.query.allocationId);

    powerSharingDao
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

    let powerSharingList = await powerSharingDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (powerSharingList === null || powerSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let powerSharingListCount = await powerSharingDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (powerSharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(powerSharingList, powerSharingListCount, page, size));
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

    let powerSharingList = await powerSharingDao
        .getListPageableByTerm(req.body, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (powerSharingList === null || powerSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let powerSharingListCount = await powerSharingDao
        .getListPageableByTermCount(req.body)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (powerSharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(powerSharingList, powerSharingListCount, page, size));
};
