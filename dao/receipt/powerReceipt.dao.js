/**
 * @author MjImani
 * phone : +989035074205
 */

const PowerReceipt = require('../../model/receipt/powerReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    getListPageableByFilter,
    getListPageableByFilterCount
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

async function getListPageableByFilter(page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        return await PowerReceipt
            .find()
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}

async function getListPageableByFilterCount() {
    try {
        return await PowerReceipt
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}
