/**
 * @author MjImani
 * phone : +989035074205
 */

const PowerSharing = require('../../../model/sharing/powerSharing.model');

module.exports = {
    getDemandPenaltyAnalysis,
    getDemandAnalysis,
    getDemandSumAnalysis,
    getReactiveAnalysis,
    getTariffAnalysis,
    getVoltageAnalysis,

};


async function getDemandPenaltyAnalysis(regionId) {
    try {
        return await PowerSharing
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
async function getDemandAnalysis(regionId) {
    try {
        return await PowerSharing
            .aggregate(
                [
                    {$unwind  : { path: "$buildingList"} },
                    {$project :
                       {
                           buildingId:"$buildingList.buildingId",
                           group:1,
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
                            group:1,
                        }
                    },    
                    { "$group": {
                        "_id": {
                            "group": "$group",
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
                        group:"$_id.group",
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
async function getDemandSumAnalysis(regionId) {
    try {
        return await PowerSharing
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
                            "capacity": "$group",
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
async function getReactiveAnalysis(regionId) {
    try {
        return await PowerSharing
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
                            "capacity": "$group",
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
async function getTariffAnalysis(regionId) {
    try {
        return await PowerSharing
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
                            "capacity": "$group",
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
async function getVoltageAnalysis(regionId) {
    try {
        return await PowerSharing
            .aggregate(
                [
                    {$unwind  : { path: "$buildingList"} },
                    {$project :
                    {
                        buildingId:"$buildingList.buildingId",
                        powerSupplyVoltage:1,
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
                            powerSupplyVoltage:1,
                        }
                    },    
                    { "$group": {
                        "_id": {
                            "powerSupplyVoltage": "$powerSupplyVoltage",
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
                        powerSupplyVoltage:"$_id.powerSupplyVoltage",
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