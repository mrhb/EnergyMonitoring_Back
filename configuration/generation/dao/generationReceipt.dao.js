/**
 * @author MRHB
 * phone : +989151575793
 * email : mmmhajjar83@gmail.com
 */

const GenerationReceipt = require('../model/generationReceipt.model');

module.exports = {
    create,
    update,
    getOne,
    deleteById,
    getListPageableByFilter,
    getListPageableByFilterCount
};

async function create(generationReceipt) {
    try {
        return await GenerationReceipt.create(generationReceipt);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, generationReceipt) {
    try {
        return await GenerationReceipt.updateOne({
                _id: id
            },
            generationReceipt
        );
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await GenerationReceipt.findOne({
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
        return await GenerationReceipt
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
        return await GenerationReceipt
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await GenerationReceipt.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}