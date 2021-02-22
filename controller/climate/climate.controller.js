/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */

// const buildingDao = require('../../dao/building/building.dao');
// const Response = require('../../middleware/response/response-handler');
// const ResponsePageable = require('../../middleware/response/responsePageable-handler');
// const ReqCreateBuildingDto = require('./dto/reqCreateBuilding.dto');
// const ReqUpdateAreaDto = require('./dto/reqUpdateArea.dto');
// const ReqBuildingSpaceDto = require('./dto/reqBuildingSpace.dto');
// const ReqMapInformation = require('./dto/reqMapInformation.dto');
// const ReqWallInformation = require('./dto/reqWallInformation.dto');
// const ReqBuildingPageFilterDto = require('./dto/reqBuildingPageFilter.dto');

exports.create = (req, res) => {
    console.log(req.body)

    // console.log('re id ' + req.user.id);
    // let reqCreateBuildingDto = new ReqCreateBuildingDto(req.body, req.user.id, next);

    // buildingDao
    //     .create(reqCreateBuildingDto)
    //     .then(result => {
    //         if (result) {
    //             if (result._id) {
    //                 res.send(Response(result._id));
    //                 return;
    //             }
    //         }
    //         throw next("در ایجاد ساختمان خطایی رخ داده است.");
    //     }).catch(err => console.log(err));
};