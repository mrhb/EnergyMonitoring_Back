/**
 * @author MjImani
 * phone : +989035074205
 */

const buildingDao = require('../../dao/building/building.dao');
const regionDao=require('../../configuration/region/region.dao')
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const ReqCreateBuildingDto = require('./dto/reqCreateBuilding.dto');
const ReqUpdateAreaDto = require('./dto/reqUpdateArea.dto');
const ReqBuildingSpaceDto = require('./dto/reqBuildingSpace.dto');
const ReqMapInformation = require('./dto/reqMapInformation.dto');
const ReqWallInformation = require('./dto/reqWallInformation.dto');
const ReqBuildingPageFilterDto = require('./dto/reqBuildingPageFilter.dto');

exports.createBuilding = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateBuildingDto = new ReqCreateBuildingDto(req.body, req.user.id, next);

    buildingDao
        .createBuilding(reqCreateBuildingDto)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد ساختمان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.createFacility = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateBuildingDto = new ReqCreateBuildingDto(req.body, req.user.id, next);

    buildingDao
        .createFacility(reqCreateBuildingDto)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد تأسیس خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه مکان نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreateBuildingDto = new ReqCreateBuildingDto(req.body, req.user.id, next);
    buildingDao
        .update(req.query.id, reqCreateBuildingDto)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش مکان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.deleteBuilding = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه مکان نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    buildingDao
        .deleteBuilding(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف مکان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.updateArea = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqUpdateAreaDto = new ReqUpdateAreaDto(req.body, next);
    buildingDao
        .updateArea(req.query.id, reqUpdateAreaDto)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش مساحت های ساختمان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.createSpace = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمی تواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    let reqBuildingSpace = new ReqBuildingSpaceDto(req.body, true, next);
    buildingDao
        .createSpace(req.query.id, reqBuildingSpace)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(reqBuildingSpace._id));
                    return;
                }
            }
            throw next("در ایجاد فضا خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.updateSpace = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمی تواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    let reqBuildingSpace = new ReqBuildingSpaceDto(req.body, false, next);

    buildingDao
        .updateSpace(req.query.id, reqBuildingSpace)
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
            throw next("در ایجاد فضا خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.deleteSpace = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمی تواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.spaceId) {
        throw next("شناسه فضا نمی تواند خالی باشد.");
    }
    console.log('query spaceId ' + req.query.spaceId);

    buildingDao
        .deleteSpace(req.query.id, req.query.spaceId)
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
            throw next("در حذف کردن فضا خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.createMapInformation = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمی تواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    let reqMapInformation = new ReqMapInformation(req.body, true, next);
    buildingDao
        .createMapInformation(req.query.id, reqMapInformation)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(reqMapInformation._id));
                    return;
                }
            }
            throw next("در ایجاد نقشه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.updateMapInformation = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمی تواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    let reqMapInformation = new ReqMapInformation(req.body, false, next);
    buildingDao
        .updateMapInformation(req.query.id, reqMapInformation)
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
            throw next("در ایجاد نقشه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.deleteMapInformation = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمی تواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.mapId) {
        throw next("شناسه نقشه نمی تواند خالی باشد.");
    }
    console.log('query mapId ' + req.query.mapId);

    buildingDao
        .deleteMapInformation(req.query.id, req.query.mapId)
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
            throw next("در حذف کردن نقشه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.updateWallInformation = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqWallInformation = new ReqWallInformation(req.body, next);
    buildingDao
        .updateWallInformation(req.query.id, reqWallInformation)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش اطلاعات جداره های ساختمان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه مکان نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    buildingDao
        .getOne(req.query.id)
        .then(result => {
            if (result !== null) {
                res.send(Response(result));
                return;
            }
            throw next("موردی یافت نشد");
        }).catch(err => console.log(err));
};

exports.getBildingListPageableByFilter = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.page) {
        throw next("شماره صفحه نمی تواند خالی باشد.");
    }
    let page = Number(req.query.page);
    if (!req.query.size) {
        throw next("اندازه صفحه نمی تواند خالی باشد.");
    }
    let size = Number(req.query.size);

    let filter = new ReqBuildingPageFilterDto(req.body);


     

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

    let result = await buildingDao
        .getBuildingListPageableByFilter(filter, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

        let buildingList =result[0].paginatedResults;
    
        if (buildingList === null || buildingList.length <= 0) {
            res.send(Response(null));
            return;
        }
    
    let buildingListCount = result[0].totalCount[0].count;
    
    
    res.send(ResponsePageable(buildingList, buildingListCount, page, size));
    };

exports.getFacilityListPageableByFilter = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.page) {
        throw next("شماره صفحه نمی تواند خالی باشد.");
    }
    let page = Number(req.query.page);
    if (!req.query.size) {
        throw next("اندازه صفحه نمی تواند خالی باشد.");
    }
    let size = Number(req.query.size);

    let filter = new ReqBuildingPageFilterDto(req.body);


        

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

    let result = await buildingDao
        .getFacilityListPageableByFilter(filter, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

        let buildingList =result[0].paginatedResults;
    
        if (buildingList === null || buildingList.length <= 0) {
            res.send(Response(null));
            return;
        }
    
    let buildingListCount = result[0].totalCount[0].count;
    
    
    res.send(ResponsePageable(buildingList, buildingListCount, page, size));
    };

    
exports.getListPageableByTerm = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.page) {
        throw next("شماره صفحه نمی تواند خالی باشد.");
    }
    let page = Number(req.query.page);
    if (!req.query.size) {
        throw next("اندازه صفحه نمی تواند خالی باشد.");
    }
    let size = Number(req.query.size);

    let term = req.query.term;
    console.log('term');
    console.log(term);
    let buildingList = await buildingDao
        .getListPageableByTerm(term, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (buildingList === null || buildingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let buildingListCount = await buildingDao
        .getListPageableByTermCount(term)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (buildingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(buildingList, buildingListCount, page, size));
};


exports.getListPageableByTermForSelection = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.page) {
        throw next("شماره صفحه نمی تواند خالی باشد.");
    }
    let page = Number(req.query.page);
    if (!req.query.size) {
        throw next("اندازه صفحه نمی تواند خالی باشد.");
    }
    let size = Number(req.query.size);

    let term = req.query.term;
    console.log('term');
    console.log(term);
    let buildingList = await buildingDao
        .getListPageableByTermForSelection(term, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (buildingList === null || buildingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let buildingListCount = await buildingDao
        .getListPageableByTermCount(term)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (buildingListCount === null) {
        res.send(Response(null));
        return;
    }
    res.send(ResponsePageable(buildingList, buildingListCount, page, size));
};

exports.getPostalCodeIsExit = async (req, res, next) => {

    
    // let isMobileExists = await userDao.isMobileExists(reqSignupDto.mobile)
    //     .then(result => {
    //         if (result) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    // if (isMobileExists) {
    //     throw next('شماره وارد شده تکراری میباشد.');
    // }



    let getPostalCodeIsExit = await buildingDao.getPostalCodeIsExit(req.query.postalCode)
        .then(result => {
            console.log(result)
            if (result) {
                return true;
            } else {
                return false;
            }
        });
    if (getPostalCodeIsExit !== null) {
        res.send(Response(getPostalCodeIsExit));
    } else {
        throw next('کد پستی وارد شده تکراری میباشد.');
    }
};
