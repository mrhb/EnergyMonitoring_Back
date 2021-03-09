/**
 * @author MjImani
 * phone : +989035074205
 */

const WaterSharing = require('../../model/sharing/waterSharing.model');


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

async function create(waterSharing) {
    try {
        return await WaterSharing.create(waterSharing);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

async function update(id, waterSharing) {
    try {
        return await WaterSharing.updateOne({
            _id: id
        }, waterSharing);
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await WaterSharing.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await WaterSharing.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function addBuildingAllocation(id, reqBuildingAllocation) {
    try {
        return await WaterSharing.updateOne({
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
        return await WaterSharing.updateOne({
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
        return await WaterSharing.updateOne({
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
        return await WaterSharing
            .find({},
                {
                    _id: 1,
                    name: 1,
                    billingId: 1,
                    addressCode: 1,
                    useType: 1,
                    buildingNum: 1,
                    numberShare: 1, // شماره اشتراک
                    useCode: 1, //    کد و نوع تعرفه 
                    capacity: 1,  // ظرفیت قراردادی 
                    createdAt: 1

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
        return await WaterSharing
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
        return await WaterSharing
            .find({
                    name: { $regex: filter.term},
                    buildingNum: 0
                },
                {
                    _id: 1,
                    name: 1,
                    billingId: 1,
                    addressCode: 1,
                    useType: 1,
                    buildingNum: 1,
                    numberShare: 1, // شماره اشتراک
                    useCode: 1, //    کد و نوع تعرفه 
                    capacity: 1,  // ظرفیت قراردادی 
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
        return await WaterSharing
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
            return await WaterSharing
                .find({
                    "_id": {$ne: id},
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        } else {
            return await WaterSharing
                .find({
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        }
    } catch (e) {
        console.log(e);
    }
}
