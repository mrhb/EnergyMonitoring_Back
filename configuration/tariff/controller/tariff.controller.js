/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

 const tariffDao = require('../dao/tariff.dao');
 const Response = require('../../../middleware/response/response-handler');
 const ResponsePageable = require('../../../middleware/response/responsePageable-handler');

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

    let TariffList = await tariffDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (TariffList === null || TariffList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let TariffListCount = await tariffDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (TariffListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(TariffList, TariffListCount, page, size));
};

exports.delete = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تعرفه نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);

    tariffDao
        .deleteById(req.query.id)
        .then(result => {
            if (result !== null) {
                if (result.deletedCount > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در حذف تعرفه خطایی رخ داده است.");
        }).catch(err => console.log(err));
};


exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let Tariff = await TariffDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    console.log(Tariff);

    if (Tariff === null) {
        throw next('محتوایی برای نمایش موجود نیست.');
    }
    res.send(Response(Tariff));
};
