/**
 * @author MjImani
 * phone : +989035074205
 */

const gasSharingDao = require('../../dao/sharing/gasSharing.dao');
const regionDao=require('../..//configuration/region/region.dao');
const ReqSharingPageFilter=require('./dto/reqSharingPageFilter.dto');

const buildingDao = require('../../dao/building/building.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const GasSharing = require('../../model/sharing/gasSharing.model');
const ReqCreateGasSharing = require('./dto/reqCreateGasSharing.dto');
const ReqBuildingAllocation = require('./dto/reqBuildingAllocation.dto');


exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateGasSharing = new ReqCreateGasSharing(req.body, req.user.id, next);

    let sharing = new GasSharing(reqCreateGasSharing);

    gasSharingDao
        .create(sharing)
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

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let sharing = await gasSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    console.log(sharing);

    if (sharing === null) {
        throw next('محتوایی برای نمایش موجود نیست.');
    }
    var gasSharingJSON = JSON.parse(JSON.stringify(sharing));
    if (gasSharingJSON.buildingList.length > 0) {
        let buildingIdList = [];
        gasSharingJSON.buildingList.forEach(item => {
            buildingIdList.push(item.buildingId);
        });

        let buildingList = await buildingDao
            .getListByIdList(buildingIdList)
            .then(result => {
                return result;
            }).catch(err => console.log(err));
        console.log(buildingList);

        gasSharingJSON.buildingList.forEach(item => {
            buildingList.forEach(building => {


                if (item.buildingId==building._id.toString()) {
                    console.log(typeof item.buildingId);
                    console.log(typeof building._id.toString());
                    item.name = building.name;
                    item.utilityType = building.utilityType;
                }
            })
        });
    }
    res.send(Response(gasSharingJSON));
};

exports.addBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }

    // Is there an gas sharing for this building?
    let isThereGas = await gasSharingDao
        .isThereBuilding(null,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isThereGas === true){
        throw next('برای ساختمان انتخابی اشتراک گاز انتخاب شده است.')
    }

    let sharing = await gasSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    if (sharing.buildingList.length > 0) {
        let allocationPercentageSum = 0;
        for (let i = 0; i < sharing.buildingList.length; i++) {
            allocationPercentageSum = allocationPercentageSum + Number(sharing.buildingList[i].allocationPercentage);
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
    let buildingAllocation = await gasSharingDao
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
        throw next("شناسه اشتراک گاز نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    // Is there an gas sharing for this building?
    let isThereGas = await gasSharingDao
        .isThereBuilding(req.query.id,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isThereGas === true){
        throw next('برای ساختمان انتخابی اشتراک گاز انتخاب شده است.')
    }

    let sharing = await gasSharingDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });

    if (sharing.buildingList.length > 0) {
        let allocationPercentageSum = Number(req.body.allocationPercentage);
        for (let i = 0; i < sharing.buildingList.length; i++) {
            if (sharing.buildingList[i].id === req.body.id) {
                continue;
            }
            allocationPercentageSum = allocationPercentageSum + Number(sharing.buildingList[i].allocationPercentage);
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

    
    let filter = new ReqSharingPageFilter(req.body);
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

        filter.regionIds.push(null);

    let result = await gasSharingDao
        .getListPageableByFilter(filter,page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

        let gasSharingList =result[0].paginatedResults;

    if (gasSharingList === null || gasSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let gasSharingListCount = result[0].totalCount[0].count;
   

    res.send(ResponsePageable(gasSharingList, gasSharingListCount, page, size));
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

    let gasSharingList = await gasSharingDao
        .getListPageableByTerm(req.body, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (gasSharingList === null || gasSharingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let gasSharingListCount = await gasSharingDao
        .getListPageableByTermCount(req.body)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (gasSharingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(gasSharingList, gasSharingListCount, page, size));
};
