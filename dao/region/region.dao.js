/**
 * @author MjImani
 * phone : +989035074205
 */

const Region = require('../../model/region/region.model');

module.exports = {
    getListByParentId
};

async function getListByParentId(parentId) {
    try {
        return await Region.find({
            parentId: parentId
        });
    } catch (e) {
        console.log(e);
    }
}
