/**
 * @author MjImani
 * phone : +989035074205
 */

const PowerReceipt = require('../../model/receipt/powerReceipt.model');

module.exports = {
    create,
    update,
    getOne
};

async function create(powerReceipt) {
    try {
        return await PowerReceipt.create(powerReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, powerReceipt) {
    try {
        return await PowerReceipt.updateOne({
                _id: id
            },
            powerReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await PowerReceipt.findOne({
                _id: id
            }
        );
    } catch (e) {
        console.log(e);
    }
}
