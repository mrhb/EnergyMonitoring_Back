/**
 * @author MjImani
 * phone : +989035074205
 */

const Building = require('../../model/building/building.model');

module.exports = {
    getListByParentId
};

async function getListByParentId(parentId) {
    try {
        return await Building.find({
            parentId: parentId
        });
    } catch (e) {
        console.log(e);
    }
}
