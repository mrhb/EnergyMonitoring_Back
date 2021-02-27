/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */

const WaterReceipt = require('../../model/receipt/waterReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    deleteById,
    getListPageableByFilter,
    getListPageableByFilterCount
};

async function create(waterReceipt) {
    try {
        return await WaterReceipt.create(waterReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, waterReceipt) {
    try {
        return await WaterReceipt.updateOne({
                _id: id
            },
            waterReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await WaterReceipt.findOne({
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
        return await WaterReceipt
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
        return await WaterReceipt
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await WaterReceipt.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}