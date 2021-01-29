/**
 * @author MjImani
 * phone : +989035074205
 */

const PowerSharing = require('../../model/sharing/powerSharing.model');

module.exports = {
    create,
    update,
    deleteById,
    getOne
};

async function create(powerSharing) {
    try {
        return await PowerSharing.create(powerSharing);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, powerSharing) {
    try {
        return await PowerSharing.updateOne({
            _id: id
        }, powerSharing);
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await PowerSharing.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await PowerSharing.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}
