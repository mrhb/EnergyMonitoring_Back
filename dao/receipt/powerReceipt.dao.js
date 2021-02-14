/**
 * @author MjImani
 * phone : +989035074205
 */

const PowerReceipt = require('../../model/receipt/powerReceipt.model');

module.exports = {
    create
};

async function create(powerReceipt) {
    try {
        return await PowerReceipt.create(powerReceipt);
    } catch (e) {
        console.log(e);
    }
}
