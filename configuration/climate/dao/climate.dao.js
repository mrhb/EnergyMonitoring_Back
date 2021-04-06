/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const Climate = require('../model/climate.model');


module.exports = {
    UpdateClimate,
    updateWeather,
    };

async function UpdateClimate(climateSharing) {
    try {
        return await Climate.create(climateSharing);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function updateWeather(id, climateSharing) {
    try {
        return await Climate.updateOne({
            _id: id
        }, climateSharing);
    } catch (e) {
        console.log(e);
    }
}