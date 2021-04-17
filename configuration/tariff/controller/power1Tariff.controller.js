/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

 const power1TariffDao = require('../dao/power1Tariff.dao');
 const Power1Tariff = require('../model/power1Tariff.model');
 const Response = require('../../../middleware/response/response-handler');
 const ReqCreatPower1Tariff=require('./dto/reqCreatPower1Tariff.dto');


 
exports.create = (req, res, next) => {
    console.log('re id ' + req.user.id);
    let reqCreatPower1Tariff = new ReqCreatPower1Tariff(req.body, req.user.id, next);

    let power1Tariff = new Power1Tariff(reqCreatPower1Tariff);
    console.log(power1Tariff);

    power1TariffDao
        .create(power1Tariff)
        .then(result => {
            if (result) {
                if (result._id) {
                    res.send(Response(result._id));
                    return;
                }
            }
            return  next("در ایجاد تعرفه نوع 1 برق خطایی رخ داده است.");
        }).catch(err => {console.log('here ' + err);throw next(err)});
};

exports.update = (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه تعرفه نوع یک برق  نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let reqCreatPower1Tariff = new ReqCreatPower1Tariff(req.body, req.user.id, next);
    power1TariffDao
        .update(req.query.id, reqCreatPower1Tariff)
        .then(result => {
            if (result !== null) {
                if (result.nModified > 0) {
                    res.send(Response(true));
                    return;
                }
            }
            throw next("در ویرایش تعرفه نوع یک برق خطایی رخ داده است.");
        }).catch(err => console.log(err));
};

