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
    getListPageableByFilterCount
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
                { $match:
                    {
                        "climateType": { 
                        "$exists": true, 
                        "$ne": null 
                    }
                }    
            },
                {$project :
                    {
                    // _id: 1,
                    province:1 , // نوع استان 
                    city: 1, // شهر
                    village: 1,//روستا
                    longitude: 1, // طول جغرافیایی
                    latitude: 1,// عرض جغرافیایی 
                    height: 1, // ارتفاع از سطح دریا
                    climateType: 1, // نوع اقلیم 
                    dominantThermalReq: 1, // نیاز غالب حرارتی
                    energyDegree: 1,  // درجه انرژی
                                   
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
