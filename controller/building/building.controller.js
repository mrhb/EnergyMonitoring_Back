/**
 * @author MjImani
 * phone : +989035074205
 */

const buildingDao = require('../../dao/building/building.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const Building = require('../../model/building/building.model');
const ReqCreateBuildingDto = require('./dto/reqCreateBuilding.dto');
const ReqUpdateAreaDto = require('./dto/reqUpdateArea.dto');
const ReqBuildingSpaceDto = require('./dto/reqBuildingSpace.dto');
const ReqMapInformation = require('./dto/reqMapInformation.dto');
const ReqWallInformation = require('./dto/reqWallInformation.dto');
const ReqBuildingPageFilterDto = require('./dto/reqBuildingPageFilter.dto');

exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateBuildingDto = new ReqCreateBuildingDto(req.body, req.user.id, next);

    buildingDao
        .create(reqCreateBuildingDto)
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

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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
            throw next("در آپدیت ساختمان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.deleteBuilding = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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
            throw next("در حذف ساختمان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.updateArea = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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
            throw next("در آپدیت مساحت های ساختمان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.createSpace = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.spaceId) {
        throw next("شناسه فضا نمیتواند خالی باشد.");
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
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.mapId) {
        throw next("شناسه نقشه نمیتواند خالی باشد.");
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
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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
            throw next("در آپدیت اطلاعات جداره های ساختمان خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
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

    let filter = new ReqBuildingPageFilterDto(req.body);

    let buildingList = await buildingDao
        .getListPageableByFilter(filter, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (buildingList === null || buildingList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let buildingListCount = await buildingDao
        .getListPageableByFilterCount(filter)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (buildingListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(buildingList, buildingListCount, page, size));
};
