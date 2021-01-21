/**
 * @author MjImani
 * phone : +989035074205
 */

const buildingDao = require('../../dao/building/building.dao');
const Response = require('../../middleware/response/response-handler');
const Building = require('../../model/building/building.model');

exports.getListByParentId = (req, res, next) => {
    console.log(req.params.parentId);
    buildingDao
        .getListByParentId(req.params.parentId)
        .then(result => {
            if (result) {
                res.send(Response(result))
            } else {
                throw next("خطایی رخ داده است.");
            }
        }).catch(err => console.log(err));
};
