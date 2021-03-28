/**
 * @author MjImani
 * phone : +989035074205
 */

const GasSharing = require('../../../model/sharing/gasSharing.model');

module.exports = {
    getCapacityListByRegion
};


async function getCapacityListByRegion(regionId) {
    try {
        return await GasSharing
            .aggregate(
                [
                    {$unwind  : { path: "$buildingList"} },
                    {$project :
                       {
                           buildingId:"$buildingList.buildingId",
                           capacity:1,
                           _id:0,
                       }
                    },
                    {$lookup:
                         {
                           from:  "buildings",
                           localField: "buildingId",
                           foreignField: "_id",
                           as: "building"
                         }
                    },
                    {$project: {
                            regionId: { $arrayElemAt: [ "$building.regionId", 0] },
                            capacity:1,
                        }
                    },    
                    { "$group": {
                        "_id": {
                            "capacity": "$capacity",
                            "regionId": "$regionId"
                        },
                        "Count": { "$sum": 1 }
                    }},
                    
                    { $addFields: { "regionId_object": { "$toObjectId": "$_id.regionId" }}},
                    {$lookup:{
                        from:  "regions",
                        localField: "regionId_object",
                        foreignField: "_id",
                        as: "region"
                        }
                    },
                    {$project: {
                        _id:0,
                        capacity:"$_id.capacity",
                        title: {$arrayElemAt: [ "$region.title", 0] },
                        Count:1
                        }
                    },
                ])
            .sort({createdAt: -1});
    } catch (e) {
        console.log(e);
    }
}
