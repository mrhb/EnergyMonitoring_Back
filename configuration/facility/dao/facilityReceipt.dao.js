/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */

const facilityReceipt = require('../model/facilityReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    deleteById,
    getListPageableByFilter,
    getListPageableByFilterCount
};

async function create(facilityReceipt) {
    try {
        return await facilityReceipt.create(facilityReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, facilityReceipt) {
    try {
        return await facilityReceipt.updateOne({
                _id: id
            },
            facilityReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await facilityReceipt.findOne({
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
        return await facilityReceipt
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
        return await facilityReceipt
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await facilityReceipt.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}