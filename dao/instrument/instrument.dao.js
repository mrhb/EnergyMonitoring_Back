/**
 * @author MjImani
 * phone : +989035074205
 */

const Instrument = require('../../model/instrument/instrument.model');

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

async function create(instrument) {
    try {
        return await Instrument.create(instrument);
    } catch (e) {
        console.log(e);
    }
}

async function update(id, instrument) {
    try {
        return await Instrument.updateOne({
            _id: id
        }, instrument);
    } catch (e) {
        console.log(e);
    }
}

async function deleteById(id) {
    try {
        return await Instrument.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await Instrument.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function addBuildingAllocation(id, reqBuildingAllocation) {
    try {
        return await Instrument.updateOne({
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
        return await Instrument.updateOne({
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
        return await Instrument.updateOne({
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
        return await Instrument
            .find({},
                {
                    _id: 1,

                    name:1, //نام تجهیز 
                    instrumentCarrier:1, //نام حامل انرژی 
                    instrumentUnit:1, //واحد انرژی
                    instrumentNum:1, //تعداد
                    instrumentUsage:1 , //کاربری تجهیر
                    consumptionPower: 1, //توان مصرفی 
                    consumptionUnit: 1, // واحد

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
        return await Instrument
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
        return await Instrument
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
        return await Instrument
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
            return await Instrument
                .find({
                    "_id": {$ne: id},
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        } else {
            return await Instrument
                .find({
                    "buildingList.buildingId": buildingId
                })
                .countDocuments();
        }
    } catch (e) {
        console.log(e);
    }
}
