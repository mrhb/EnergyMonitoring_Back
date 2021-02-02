/**
 * @author MjImani
 * phone : +989035074205
 */

const waterSharingDao = require('../../dao/sharing/waterSharing.dao');
const buildingDao = require('../../dao/building/building.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const ReqCreateWaterSharing = require('./dto/reqCreateWaterSharing.dto');
const WaterSharing = require('../../model/sharing/waterSharing.model');
const ReqBuildingAllocation = require('./dto/reqBuildingAllocation.dto');


exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateWaterSharing = new ReqCreateWaterSharing(req.body, req.user.id, next);

    let waterSharing = new WaterSharing(reqCreateWaterSharing);
    console.log(111111111);
    console.log(waterSharing);
    console.log(222222222);

    waterSharingDao
        .create(waterSharing)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            return  next("در ایجاد اشتراک آب خطایی رخ داده است.");
        }).catch(err => {console.log('here ' + err);throw next(err)});
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک آب نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreateWaterSharing = new ReqCreateWaterSharing(req.body, req.user.id, next);
    waterSharingDao
        .update(req.query.id, reqCreateWaterSharing)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در آپدیت اشتراک آب خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک آب نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    waterSharingDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف اشتراک آب خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک آب نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let waterSharing = await waterSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    console.log(waterSharing);

    if (waterSharing === null) {
        throw next('محتوایی برای نمایش موجود نیست.');
    }

    if (waterSharing.buildingList.length > 0) {
        let buildingIdList = [];
        waterSharing.buildingList.forEach(item => {
            buildingIdList.push(item.buildingId);
        });

        let buildingList = await buildingDao
            .getListByIdList(buildingIdList)
            .then(result => {
                return result;
            }).catch(err => console.log(err));
        console.log(buildingList);

        waterSharing.buildingList.forEach(item => {
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
    res.send(Response(waterSharing));
};

exports.addBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک آب نمیتواند خالی باشد.");
    }

    let waterSharing = await waterSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    if (waterSharing.buildingList.length > 0) {
        let allocationPercentageSum = 0;
        for (let i = 0; i < waterSharing.buildingList.length; i++) {
            allocationPercentageSum = allocationPercentageSum + Number(waterSharing.buildingList[i].allocationPercentage);
        }
        allocationPercentageSum = allocationPercentageSum + Number(req.body.allocationPercentage);
        if (allocationPercentageSum > 100) {
            throw next('درصد های تخصیص بیشتر از 100 شده است.')
        }
    }
    let reqBuildingAllocation = new ReqBuildingAllocation(req.body, true, next);
    let buildingAllocation = await waterSharingDao
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
    reqBuildingAllocation.useType = building.useType;
    reqBuildingAllocation.postalCode = building.postalCode;
    delete reqBuildingAllocation._id;
    res.send(Response(reqBuildingAllocation));
};

exports.updateBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک آب نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    let waterSharing = await waterSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });

    if (waterSharing.buildingList.length > 0) {
        let allocationPercentageSum = Number(req.body.allocationPercentage);
        for (let i = 0; i < waterSharing.buildingList.length; i++) {
            if (waterSharing.buildingList[i].id === req.body.id) {
                continue;
            }
            allocationPercentageSum = allocationPercentageSum + Number(waterSharing.buildingList[i].allocationPercentage);
        }
        if (allocationPercentageSum > 100) {
            throw next('درصد های تخصیص بیشتر از 100 شده است.')
        }
    }

    let reqBuildingAllocation = new ReqBuildingAllocation(req.body, false, next);
    waterSharingDao
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
        throw next("شناسه اشتراک آب نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.allocationId) {
        throw next("شناسه ساختمان اختصاص یافته نمیتواند خالی باشد.");
    }
    console.log('query allocationId ' + req.query.allocationId);

    waterSharingDao
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

    let waterSharingList = await waterSharingDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (waterSharingList === null || waterSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let waterSharingListCount = await waterSharingDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (waterSharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(waterSharingList, waterSharingListCount, page, size));
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

    let waterSharingList = await waterSharingDao
        .getListPageableByTerm(req.body, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (waterSharingList === null || waterSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let waterSharingListCount = await waterSharingDao
        .getListPageableByTermCount(req.body)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (waterSharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(waterSharingList, waterSharingListCount, page, size));
};
