/**
 * @k_pour Kazem PourBadakhshan
 * email : k_pour@mail.com
 */

const facilitySharing = require('../model/facilitySharing.model');


module.exports = {
    create,
    update,
    deleteById,
    getOne,
    addBuildingAllocation,
    updateBuildingAllocation,
    deleteBuildingAllocation,
    getListPageableByFilter,
    getListPageableByFilterCount,
    getListPageableByTerm,
    getListPageableByTermCount,
    isThereBuilding
};

async function create(facilitySharing) {
    try {
        return await facilitySharing.create(facilitySharing);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function update(id, facilitySharing) {
    try {
        return await facilitySharing.updateOne({
            _id: id
        }, facilitySharing);
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await facilitySharing.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await facilitySharing.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function addBuildingAllocation(id, reqBuildingAllocation) {
    try {
        return await facilitySharing.updateOne({
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
        return await facilitySharing.updateOne({
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
        return await facilitySharing.updateOne({
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
        return await facilitySharing
            .find({},
                {
                    _id: 1,
                    name: 1,// نام نیروگاه
                    consumptionType: 1,//  نوع نیروگاه 
                    capacity: 1,  // ظرفیت  
                    facilityType: 1 //    نوع مصرف  
                })
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}


async function getListPageableByFilterCount() {
    try {
        return await facilitySharing
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
        return await facilitySharing
            .find({
                    name: { $regex: filter.term},
                    buildingNum: 0
                },
                {
                    _id: 1,
                    name: 1,// نام نیروگاه
                    consumptionType: 1,//   نوع مصرف  
                    capacity: 1,  // ظرفیت  
                    facilityType: 1 //   نوع نیروگاه 
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
        return await facilitySharing
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
            return await facilitySharing
                .find({
                    "_id": {$ne: id},
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        } else {
            return await facilitySharing
                .find({
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        }
    } catch (e) {
        console.log(e);
    }
}
