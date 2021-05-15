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
    getListBybillingIdList,
    addBuildingAllocation,
    updateBuildingAllocation,
    deleteBuildingAllocation,
    getListPageableByFilter,
    getListPageableByFilterCount,
    getListPageableByTerm,
    getListPageableByTermCount,
    isThereBuilding
};

async function create(sharing) {
    try {
        return await GasSharing.create(sharing);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, sharing) {
    try {
        return await GasSharing.updateOne({
            _id: id
        }, sharing);
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

async function getListBybillingIdList(idList) {
    try {
        return await GasSharing.find({
            billingId: {$in: idList}
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

async function getListPageableByFilter(filter,page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        return await GasSharing
            .aggregate(
                [

                    {
                        $lookup: {
                           from: "buildings",
                           localField: "buildingList.buildingId",    // field in the orders collection
                           foreignField: "_id",  // field in the items collection
                           as: "buildingList"
                        }
                     },
                     
                     {$project :
                          {
                            _id: 1,
                            name: 1,
                            billingId: 1,
                            addressCode: 1,
                            useType: 1,
                            createdAt: 1,
                            group: 1,
                            capacity: 1,
                            numberShare: 1,
                            buildingNum: {$size: "$buildingList" }
                          }
                      },
                      { $match : { regionId : {$in: filter.regionIds} } } ,

                      {$facet: {
                          paginatedResults: [{ $skip: skip }, { $limit: size }],
                          totalCount: [
                            {
                              $count: 'count'
                            }
                          ]
                        }}
                ]
            )
            .sort({createdAt: -1})
           ;
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
