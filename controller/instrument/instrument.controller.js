/**
 * @author MjImani
 * phone : +989035074205
 */

const instrumentDao = require('../../dao/instrument/instrument.dao');
const buildingDao = require('../../dao/building/building.dao');
const Response = require('../../middleware/response/response-handler');
const ResponsePageable = require('../../middleware/response/responsePageable-handler');
const Instrument = require('../../model/instrument/instrument.model');
const ReqCreateInstrument = require('./dto/reqCreateInstrument.dto');
const ReqBuildingAllocation = require('./dto/reqBuildingAllocation.dto');


exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreateInstrument = new ReqCreateInstrument(req.body, req.user.id, next);

    let instrument = new Instrument(reqCreateInstrument);

    instrumentDao
        .create(instrument)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            throw next("در ایجاد تجهیز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تجهیز نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreateInstrument = new ReqCreateInstrument(req.body, req.user.id, next);
    instrumentDao
        .update(req.query.id, reqCreateInstrument)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در آپدیت تجهیز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تجهیز نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    instrumentDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف تجهیز خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تجهیز نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let instrument = await instrumentDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    console.log(instrument);

    if (instrument === null) {
        throw next('محتوایی برای نمایش موجود نیست.');
    }

    if (instrument.buildingList.length > 0) {
        let buildingIdList = [];
        instrument.buildingList.forEach(item => {
            buildingIdList.push(item.buildingId);
        });

        let buildingList = await buildingDao
            .getListByIdList(buildingIdList)
            .then(result => {
                return result;
            }).catch(err => console.log(err));
        console.log(buildingList);

        instrument.buildingList.forEach(item => {
            buildingList.forEach(building => {


                if (item.buildingId.equals(building._id)) {
                    console.log(typeof item.buildingId);
                    console.log(typeof building._id.toString());
                    item.name = building.name;
                    item.useType = building.useType;
                    item.postalCode = building.postalCode;
                }
            })
        });
    }
    res.send(Response(instrument));
};

exports.addBuildingAllocation = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تجهیز نمیتواند خالی باشد.");
    }

    // Is there an instrument for this building?
    let isThereInstrument = await instrumentDao
        .isThereBuilding(null,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isThereInstrument === true){
        throw next('برای ساختمان انتخابی تجهیز انتخاب شده است.')
    }

    let instrument = await instrumentDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });
    if (instrument.buildingList.length > 0) {
        let allocationPercentageSum = 0;
        for (let i = 0; i < instrument.buildingList.length; i++) {
            allocationPercentageSum = allocationPercentageSum + Number(instrument.buildingList[i].allocationPercentage);
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
    let buildingAllocation = await instrumentDao
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
        throw next("در اضافه کردن ساختمان به تجهیز خطایی رخ داده است.");
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
        throw next("شناسه تجهیز نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    // Is there an instrument for this building?
    let isThereInstrument = await instrumentDao
        .isThereBuilding(req.query.id,req.body.buildingId)
        .then(result => {
            if (result !== null && result > 0)
                return true;
            else
                return false;
        });
    if (isThereInstrument === true){
        throw next('برای ساختمان انتخابی تجهیز انتخاب شده است.')
    }

    let instrument = await instrumentDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        });

    if (instrument.buildingList.length > 0) {
        let allocationPercentageSum = Number(req.body.allocationPercentage);
        for (let i = 0; i < instrument.buildingList.length; i++) {
            if (instrument.buildingList[i].id === req.body.id) {
                continue;
            }
            allocationPercentageSum = allocationPercentageSum + Number(instrument.buildingList[i].allocationPercentage);
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
    instrumentDao
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
        throw next("شناسه تجهیز نمیتواند خالی باشد.");
    }
    console.log('query id ' + req.query.id);

    if (!req.query.allocationId) {
        throw next("شناسه ساختمان اختصاص یافته نمیتواند خالی باشد.");
    }
    console.log('query allocationId ' + req.query.allocationId);

    instrumentDao
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

    let instrumentList = await instrumentDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (instrumentList === null || instrumentList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let instrumentListCount = await instrumentDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (instrumentListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(instrumentList, instrumentListCount, page, size));
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

    let instrumentList = await instrumentDao
        .getListPageableByTerm(req.body, page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (instrumentList === null || instrumentList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let instrumentListCount = await instrumentDao
        .getListPageableByTermCount(req.body)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (instrumentListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(instrumentList, instrumentListCount, page, size));
};
