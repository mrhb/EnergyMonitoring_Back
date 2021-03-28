/**
 * @author MjImani
 * phone : +989035074205
 */

const regionDao = require('../../dao/region/region.dao');
const Response = require('../../middleware/response/response-handler');
const Region = require('../../model/region/region.model');

exports.getListByParentId = (req, res, next) => {
    console.log(req.params.parentId);

if(req.params.parentId=="ROOT")
    req.params.parentId="000000000000000000000000";
    regionDao
        .getListByParentId(req.params.parentId)
        .then(result => {
            if (result) {
                res.send(Response(result))
            } else {
                throw next("خطایی رخ داده است.");
            }
        }).catch(err => console.log(err));
};
