/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const Climate = require('../model/climate.model');


module.exports = {
    UpdateClimate,
    deleteWeathers,
    insertWeathers,
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

        return await Climate.create(WeatherList);
    } catch (e) {
        console.log(e);
    }
}