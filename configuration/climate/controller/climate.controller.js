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
                    if (result[0]._id) {
                        res.send(Response(true));
                        return;
                    }
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
         .insertWeathers(req.query.id, reqUpdateClimate)
         .then(result => {
             if (result !== null) {
                 if (result.nModified > 0) {
                     res.send(Response(true));
                     return;
                 }
             }
             throw next("در ویرایش اطلاعات آب و هوا خطایی رخ داده است.");
         }).catch(err => console.log(err));
 };
 