/**
 * @author m.Reza Hajjar
 * phone : +989151575793
 */

const regionDao = require('./region.dao');
const Response = require('../../middleware/response/response-handler');
const ReqRegionCreate= require('./reqRegionCreate.dto');
const Region = require('./region.model');




exports.create = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.body.parentId) {
        throw next("شناسه منطقه بالاتر نمی تواند خالی باشد.");
    }

    let parentRegion = await regionDao
        .getOne(req.body.parentId)
        .then(result => {
            return result;
        });
    console.log(parentRegion);
    if (parentRegion === null) {
        throw next("منطقه بالاتری که انتخاب شده، صحیح نمیباشد.");
    }

    let reqRegionCreate = new ReqRegionCreate(req.body, req.user.id, parentRegion, next);


    let generationReceipt = new Region(reqRegionCreate);
    console.log(generationReceipt);

    regionDao
        .create(generationReceipt)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result));
                    return;
                }
            }
            throw next("در ایجاد منطقه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.update = async (req, res, next) => {
    console.log('re id ' + req.user.id);

    if (!req.query.id) {
        throw next("شناسه منطقه   نمی تواند خالی باشد.");
    }
    if (!req.body.parentId) {
        throw next("شناسه  منطقه بالاتر نمی تواند خالی باشد.");
    }

    let parentRegion = await regionDao
        .getOne(req.body.parentId)
        .then(result => {
            return result;
        });
    if (parentRegion === null) {
        throw next("شناسه منطقه بالاتر انتخابی صحیح نمیباشد.");
    }

    let reqRegionCreate = new ReqRegionCreate(req.body, req.user.id, parentRegion, next);

    regionDao
        .update(req.query.id, reqRegionCreate)
        .then(result => {
            if (result) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش منطقه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه منطقه انتخابی نمی تواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    regionDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف نیروگاه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

exports.getListByParentId = (req, res, next) => {
    console.log(req.params.parentId);

if(req.params.parentId=="ROOT")
    req.params.parentId="000000000000000000000000";
    regionDao
        .getListByParentId(req.params.parentId)
        .then(result => {
            if (result) {
                res.send(Response(result))
            } else {
                throw next("خطایی رخ داده است.");
            }
        }).catch(err => console.log(err));
};
