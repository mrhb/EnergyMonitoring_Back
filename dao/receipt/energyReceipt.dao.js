/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */

const EnergyReceipt = require('../../model/receipt/energyReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    deleteById,
    getListPageableByFilter,
    getListPageableByFilterCount
};

async function create(energyReceipt) {
    try {
        return await EnergyReceipt.create(energyReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, energyReceipt) {
    try {
        return await EnergyReceipt.updateOne({
                _id: id
            },
            energyReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await EnergyReceipt.findOne({
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
        return await EnergyReceipt
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
        return await EnergyReceipt
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await EnergyReceipt.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}