/**
 * @author MjImani
 * phone : +989035074205
 */

const GenerationSharing = require('../model/generationSharing.model');


module.exports = {
    create,
    update,
    deleteById,
    getOne,
    addBuildingAllocation,
    updateBuildingAllocation,
    deleteBuildingAllocation,
    getListPageableByFilter,
    getListPageableByTerm,
    getListPageableByTermCount,
    isThereBuilding
};

async function create(generationSharing) {
    try {
        return await GenerationSharing.create(generationSharing);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function update(id, generationSharing) {
    try {
        return await GenerationSharing.updateOne({
            _id: id
        }, generationSharing);
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await GenerationSharing.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await GenerationSharing.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function addBuildingAllocation(id, reqBuildingAllocation) {
    try {
        return await GenerationSharing.updateOne({
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
        return await GenerationSharing.updateOne({
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
        return await GenerationSharing.updateOne({
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
        return await GenerationSharing
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
                            billingId:1,
                            name: 1,// نام نیروگاه
                            consumptionType: 1,//  نوع نیروگاه 
                            capacity: 1,  // ظرفیت  
                            generationType: 1, //    نوع مصرف  ,
                            createdAt: 1,
                            buildingNum: {$size: "$buildingList" },
                            regionId:{ $first:"$buildingList.regionId"}
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
            .sort({createdAt: -1});

            
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
        return await GenerationSharing
            .find({
                    name: { $regex: filter.term},
                    buildingNum: 0
                },
                {
                    _id: 1,
                    name: 1,// نام نیروگاه
                    consumptionType: 1,//   نوع مصرف  
                    capacity: 1,  // ظرفیت  
                    generationType: 1 //   نوع نیروگاه 
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
        return await GenerationSharing
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
            return await GenerationSharing
                .find({
                    "_id": {$ne: id},
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        } else {
            return await GenerationSharing
                .find({
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        }
    } catch (e) {
        console.log(e);
    }
}
