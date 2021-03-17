/**
 * @author MjImani
 * phone : +989035074205
 */

const facilityDao = require('./../dao/facility.dao');
const Response = require('../../../middleware/response/response-handler');
const ResponsePageable = require('../../../middleware/response/responsePageable-handler');
const ReqCreateFacilityDto = require('./dto/reqCreateFacility.dto');
const ReqMapInformation = require('./dto/reqMapInformation.dto');
const ReqFacilityPageFilterDto = require('./dto/reqFacilityPageFilter.dto');

exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateFacilityDto = new ReqCreateFacilityDto(req.body, req.user.id, next);

    facilityDao
        .create(reqCreateFacilityDto)
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
    let reqCreateFacilityDto = new ReqCreateFacilityDto(req.body, req.user.id, next);
    facilityDao
        .update(req.query.id, reqCreateFacilityDto)
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

exports.deleteFacility = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    facilityDao
        .deleteFacility(req.query.id)
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


exports.createMapInformation = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    let reqMapInformation = new ReqMapInformation(req.body, true, next);
    facilityDao
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
    facilityDao
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

    facilityDao
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



exports.getOne = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه ساختمان نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    facilityDao
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

    let filter = new ReqFacilityPageFilterDto(req.body);

    let facilityList = await facilityDao
        .getListPageableByFilter(filter, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilityList === null || facilityList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let facilityListCount = await facilityDao
        .getListPageableByFilterCount(filter)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilityListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(facilityList, facilityListCount, page, size));
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

    let term = req.query.term;
    console.log('term');
    console.log(term);
    let facilityList = await facilityDao
        .getListPageableByTerm(term, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilityList === null || facilityList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let facilityListCount = await facilityDao
        .getListPageableByTermCount(term)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (facilityListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(facilityList, facilityListCount, page, size));
};
