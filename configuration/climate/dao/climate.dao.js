/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const Climate = require('../model/climate.model');


module.exports = {
    UpdateClimate,
    deleteWeathers,
    insertWeathers,
    getListPageableByFilter,
    getListPageableByFilterCount,
    getOne
    };

async function UpdateClimate(id,climate) {
    try {
        return await Climate.updateOne({
            _id: id
        }, climate);    } catch (e) {
        console.log(e);
        throw e;
    }
}

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


async function getListPageableByFilter(page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        return await Climate
        .aggregate(
            [
                // { $match:
                //     {
                //         "climateType": { 
                //         "$exists": true, 
                //         "$ne": null 
                //     }
                // }    
            // },
                {$project :
                    {
                    _id: 1,
                    title:1,// نام منطقه
                    province:1 , // نوع استان 
                    city: 1, // شهر
                    village: 1,//روستا
                    longitude: 1, // طول جغرافیایی
                    latitude: 1,// عرض جغرافیایی 
                    height: 1, // ارتفاع از سطح دریا
                    climateType: 1, // نوع اقلیم 
                    dominantThermalReq: 1, // نیاز غالب حرارتی
                    energyDegree: 1,  // درجه انرژی
                    dailyweathers:1,
                }
            },
             {$unwind  : { path: "$dailyweathers" ,includeArrayIndex:"index",}  },
                    {$group:
                        {
                        _id: "$_id",
                        title: { $first: '$title' }, // عنوان 
                        province: { $first: '$province' }, // استان 
                        city: { $first: '$city' }, // شهر
                        longitude: { $first: '$longitude' }, // طول جغرافیایی
                        latitude: { $first: '$latitude' },// عرض جغرافیایی 
                        climateType: { $first: '$climateType' }, // نوع اقلیم 
                        
                        title : { $first: '$title' },
                        regionId : { $first: '$_id' },
                        tempMaxMean:{$avg: "$dailyweathers.tempMax"},
                        tempMinMean:{$avg: "$dailyweathers.tempMin"},
                        HumidMaxMean:{$avg: "$dailyweathers.humidityMax"},
                        lowHumidMean:{$avg: "$dailyweathers.humidityMin"},
                        windMean:{$avg: "$dailyweathers.wind"},
                        }
                    },

                    { $project:
                         { 
                            _id: 1,
                            title:1,// نام منطقه
                            province:1 , // نوع استان 
                            city: 1, // شهر
                            village: 1,//روستا
                            longitude: 1, // طول جغرافیایی
                            latitude: 1,// عرض جغرافیایی 
                            height: 1, // ارتفاع از سطح دریا
                            climateType: 1, // نوع اقلیم 
                            dominantThermalReq: 1, // نیاز غالب حرارتی
                            energyDegree: 1,  // درجه انرژی
                            dailyweathers:1,
                            

                            tempMaxMean:{ $round: ["$tempMaxMean",2]},
                            tempMinMean:{ $round: ["$tempMinMean",2]},
                            HumidMaxMean:{ $round: ["$HumidMaxMean",2]},
                            lowHumidMean:{ $round: ["$lowHumidMean",2]},
                            windMean:{ $round: ["$windMean",2]},
                             roundedValue: { $round: [ "$value", -1 ] } 
                         }
                        }

        ]
    )
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}


async function getListPageableByFilterCount() {
    try {
        return await Climate
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await Climate.findOne({
            _id: id
        },
        {
            title:1,
            province:1,
            city:1,
            village:1,
            longitude:1,
            latitude:1,
            height:1,
            climateType:1,
            dominantThermalReq: 1, // نیاز غالب حرارتی
            energyDegree: 1,
        });
    } catch (e) {
        console.log(e);
    }
}