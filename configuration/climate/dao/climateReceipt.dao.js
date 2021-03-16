/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */

const ClimateReceipt = require('../model/climateReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    deleteById,
    getListPageableByFilter,
    getListPageableByFilterCount
};

async function create(climateReceipt) {
    try {
        return await ClimateReceipt.create(climateReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, climateReceipt) {
    try {
        return await ClimateReceipt.updateOne({
                _id: id
            },
            climateReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await ClimateReceipt.findOne({
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
        return await ClimateReceipt
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
        return await ClimateReceipt
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await ClimateReceipt.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}