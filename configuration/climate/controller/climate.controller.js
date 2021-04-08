/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

 const climateDao = require('../dao/climate.dao');
 const Response = require('../../../middleware/response/response-handler');
 const ResponsePageable = require('../../../middleware/response/responsePageable-handler');
 const ReqUpdateWeather=require('./dto/reqUpdateWeather.dto');
 const ReqUpdateClimate=require('./dto/reqUpdateWeather.dto');
 

 exports.updateWeather = (req, res, next) => {
     if (!req.query.id) {
         throw next("شناسه منطقه نمیتواند خالی باشد.");
     }
     let WeatherList = req.body;

    //  console.log('re id ' + req.query.id);

    //  console.log('user.id ' + req.user.id);


    // let reqUpdateWeather = new ReqUpdateWeather(req.body,  next);



    let WeatherListIds = [];
    WeatherList.forEach(item => {
        WeatherListIds.push(item.forDate);
    });

    climateDao
         .deleteWeathers(req.query.id, WeatherListIds)
         .then(result => {
             if (result !== null) {
                 if (result.nModified > 0) {
                     res.send(Response(true));
                     return;
                 }
             }
             throw next("در حذف اطلاعات قبلی آب و هوا خطایی رخ داده است.");
         }).catch(err => console.log(err));


    climateDao
         .insertWeathers(req.query.id, WeatherList)
         .then(result => {
             if (result !== null) {
                    // if (result[0]._id) {
                        res.send(Response(true));
                        return;
                    // }
             }
             throw next("در افزودن  اطلاعات جدید آب و هوا خطایی رخ داده است.");
         }).catch(err => console.log(err));
 
 };
 
 exports.updateClimate = (req, res, next) => {
    //  console.log('user.id ' + req.user.id);
     if (!req.query.id) {
         throw next("شناسه منطقه نمیتواند خالی باشد.");
     }
     console.log('re id ' + req.query.id);
     let reqUpdateClimate = new ReqUpdateClimate(req.body, next);
     climateDao
         .UpdateClimate(req.query.id, reqUpdateClimate)
         .then(result => {
             if (result !== null) {
                 if (result.nModified > 0) {
                     res.send(Response(true));
                     return;
                 }
             }
             throw next("در ویرایش اطلاعات اقلیم خطایی رخ داده است.");
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

    let climateList = await climateDao
        .getListPageableByFilter(page, size)
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (climateList === null || climateList.length <= 0) {
        res.send(Response(null));
        return;
    }

    let climateListCount = await climateDao
        .getListPageableByFilterCount()
        .then(result => {
            return result;
        }).catch(err => console.log(err));

    if (climateListCount === null) {
        res.send(Response(null));
        return;
    }

    res.send(ResponsePageable(climateList, climateListCount, page, size));
};

exports.getOne = async (req, res, next) => {
    console.log('user.id ' + req.user.id);
    if (!req.query.id) {
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }
    console.log('re id ' + req.query.id);
    let climate = await climateDao
        .getOne(req.query.id)
        .then(result => {
            return result;
        }).catch(err => console.log(err));
    console.log(climate);

    if (climate === null) {
        throw next('محتوایی برای نمایش موجود نیست.');
    }
    res.send(Response(climate));
};
