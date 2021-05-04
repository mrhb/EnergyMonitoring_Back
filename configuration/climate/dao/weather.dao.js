/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const Climate = require('../model/climate.model');


module.exports = {
    deleteWeathers,
    insertWeathers,
    getWeatherListByDate,
    };


async function deleteWeathers(id,WeatherIds) {
    try {
        return await Climate.updateOne(
            {_id:id},
            { $pull: {
                dailyweathers:{forDate:{ $in: WeatherIds}}
            }
         });
    } catch (e) {
        console.log(e);
    }
}


async function insertWeathers(id,WeatherList) {
    try {
        return await Climate.updateOne(
            {_id:id},
            { $push: {
                dailyweathers: WeatherList
            }
         });
    } catch (e) {
        console.log(e);
    }
}



async function getWeatherListByDate(req) {
    try {




        return await Climate
            .aggregate(
                [ 
                    { $addFields:
                        { "regionId_string": { "$toString": "$_id" }}},
                    { $match : { regionId_string:req.regionId  } },
                   
                    {$project: {
                        _id:0,
                        dailyweathers: {
                           $filter: {
                              input: "$dailyweathers",
                              as: "item",
                               cond: { $and: [
                                       {$gte: [ "$$item.forDate",  req.fromDate ]},
                                       {$lte: [ "$$item.forDate",  req.toDate  ]}
                                     ] }
                           }
                        }
                     }
                  }
                ])
                .sort({createdAt: -1});
    } catch (e) {
        console.log(e);
    }
}