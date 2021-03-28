/**
 * @author MjImani
 * phone : +989035074205
 */

const GasSharing = require('../../model/sharing/gasSharing.model');

module.exports = {
    create,
    update,
    deleteById,
    getOne,
    addBuildingAllocation,
    updateBuildingAllocation,
    deleteBuildingAllocation,
    getListPageableByFilter,
    getCapacityListByRegion,
    getListPageableByFilterCount,
    getListPageableByTerm,
    getListPageableByTermCount,
    isThereBuilding
};

async function create(gasSharing) {
    try {
        return await GasSharing.create(gasSharing);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, gasSharing) {
    try {
        return await GasSharing.updateOne({
            _id: id
        }, gasSharing);
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await GasSharing.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await GasSharing.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function addBuildingAllocation(id, reqBuildingAllocation) {
    try {
        return await GasSharing.updateOne({
            _id: id
        }, {
            $push: {
                buildingList: reqBuildingAllocation
            },
            $inc: {
                buildingNum: 1
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateBuildingAllocation(id, reqBuildingAllocation) {
    try {
        return await GasSharing.updateOne({
            _id: id,
            buildingList: {$elemMatch: {_id: reqBuildingAllocation._id}}
        }, {
            $set: {
                "buildingList.$.buildingId": reqBuildingAllocation.buildingId,
                "buildingList.$.allocationPercentage": reqBuildingAllocation.allocationPercentage
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteBuildingAllocation(id, allocationId) {
    try {
        return await GasSharing.updateOne({
            _id: id
        }, {
            $pull: {
                buildingList: {
                    _id: allocationId
                }
            },
            $inc: {
                buildingNum: -1
            }
        });
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
        return await GasSharing
            .find({},
                {
                    _id: 1,
                    name: 1,
                    buildingNum: 1,
                    billingId: 1,
                    addressCode: 1,
                    useType: 1,
                    createdAt: 1,
                    group: 1,
                    capacity: 1,
                    numberShare: 1
                })
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}


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

async function getListPageableByFilterCount() {
    try {
        return await GasSharing
            .find()
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}


async function getListPageableByTerm(filter, page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        if (filter.term === null || filter.term === 'undefined'){
            filter.term = '';
        }
        return await GasSharing
            .find({
                    name: { $regex: filter.term},
                    buildingNum: 0
                },
                {
                    _id: 1,
                    name: 1,
                    billingId: 1,
                    buildingNum: 1,
                    addressCode: 1,
                    useType: 1,
                    group: 1,
                    capacity: 1,
                    numberShare: 1,
                    createdAt: 1
               })
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}

async function getListPageableByTermCount(filter) {
    try {
        if (filter.term === null || filter.term === 'undefined'){
            filter.term = '';
        }
        return await GasSharing
            .find({
                name: { $regex: filter.term},
                buildingNum: 0
            })
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function isThereBuilding(id, buildingId) {
    try {
        if (id !== null) {
            return await GasSharing
                .find({
                    "_id": {$ne: id},
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        } else {
            return await GasSharing
                .find({
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        }
    } catch (e) {
        console.log(e);
    }
}
