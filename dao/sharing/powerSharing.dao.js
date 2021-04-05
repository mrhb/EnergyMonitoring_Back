/**
 * @author MjImani
 * phone : +989035074205
 */

const PowerSharing = require('../../model/sharing/powerSharing.model');

module.exports = {
    create,
    update,
    deleteById,
    getOne,
    getListByIdList,
    addBuildingAllocation,
    updateBuildingAllocation,
    deleteBuildingAllocation,
    getListPageableByFilter,
    getListPageableByFilterCount,
    getListPageableByTerm,
    getListPageableByTermCount,
    isThereBuilding
};

async function create(powerSharing) {
    try {
        return await PowerSharing.create(powerSharing);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, powerSharing) {
    try {
        return await PowerSharing.updateOne({
            _id: id
        }, powerSharing);
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await PowerSharing.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await PowerSharing.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getListByIdList(idList) {
    try {
        return await PowerSharing.find({
            _id: {$in: idList}
        });
    } catch (e) {
        console.log(e);
    }
}

async function addBuildingAllocation(id, reqBuildingAllocation) {
    try {
        return await PowerSharing.updateOne({
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
        return await PowerSharing.updateOne({
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
        return await PowerSharing.updateOne({
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
        return await PowerSharing
            .aggregate(
                [
                    {$project :
                        {
                                    _id: 1,
                                    name: 1,
                                    billingId: 1,
                                    addressCode: 1,
                                    useType: 1,
                                    useCode: 1,
                                    group:1,
                                    contract:1,
                                    createdAt: 1,
                                    buildingNum: {$size: "$buildingList" }
                
                        }
                    }
                ]
            )
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}

async function getListPageableByFilterCount() {
    try {
        return await PowerSharing
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
        if (filter.term === null || filter.term === 'undefined') {
            filter.term = '';
        }
        return await PowerSharing
            .find({
                    name: {$regex: filter.term},
                    buildingNum: 0
                },
                {
                    _id: 1,
                    name: 1,
                    billingId: 1,
                    addressCode: 1,
                    useType: 1,
                    group:1,
                    buildingNum: 1,
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
        if (filter.term === null || filter.term === 'undefined') {
            filter.term = '';
        }
        return await PowerSharing
            .find({
                name: {$regex: filter.term},
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
            return await PowerSharing
                .find({
                    "_id": {$ne: id},
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        } else {
            return await PowerSharing
                .find({
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        }
    } catch (e) {
        console.log(e);
    }
}
