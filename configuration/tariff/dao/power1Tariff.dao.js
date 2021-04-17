/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const Power1Tariff = require('../model/power1Tariff.model');


module.exports = {
    create,
    update,
    };

    async function create(tariff) {
        try {
            return await Power1Tariff.create(tariff);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
    
    async function update(id, tariff) {
        try {
            return await Power1Tariff.updateOne({
                _id: id
            }, tariff);
        } catch (e) {
            console.log(e);
        }
    }