/**
 * @author MjImani
 * phone : +989035074205
 */

const Facility = require('./../model/facility.model');
const mongoose = require('./../../../config/mongoose').mongoose;//

module.exports = {
    create,
    update,
    deleteFacility,
    updateArea,
    createSpace,
    updateSpace,
    deleteSpace,
    createMapInformation,
    updateMapInformation,
    deleteMapInformation,
    updateWallInformation,
    getOne,
    getListByIdList,
    getListPageableByFilter,
    getListPageableByFilterCount,
    getListPageableByTerm,
    getListPageableByTermCount
};

async function create(reqCreateFacilityDto) {
    try {
        return await Facility.create({
            regionId: reqCreateFacilityDto.regionId,
            regionTitle: reqCreateFacilityDto.regionTitle,
            name: reqCreateFacilityDto.name,
            facilityUsage: reqCreateFacilityDto.facilityUsage,
            constructionYear: reqCreateFacilityDto.constructionYear,
            floorNum: reqCreateFacilityDto.floorNum,
            exploitationPersonnelNum: reqCreateFacilityDto.exploitationPersonnelNum,
            postalCode: reqCreateFacilityDto.postalCode,
            address: reqCreateFacilityDto.address,
            ownership: reqCreateFacilityDto.ownership,
            coolingHeatingSystemType: reqCreateFacilityDto.coolingHeatingSystemType,
            creatorId: reqCreateFacilityDto.creatorId,
            ownerId: reqCreateFacilityDto.ownerId,
        });
    } catch (e) {
        console.log(e);
    }
}

async function update(id, reqCreateFacilityDto) {
    try {
        return await Facility.updateOne({
            _id: id
        }, {
            regionId: reqCreateFacilityDto.regionId,
            regionTitle: reqCreateFacilityDto.regionTitle,
            name: reqCreateFacilityDto.name,
            facilityUsage: reqCreateFacilityDto.facilityUsage,
            constructionYear: reqCreateFacilityDto.constructionYear,
            floorNum: reqCreateFacilityDto.floorNum,
            exploitationPersonnelNum: reqCreateFacilityDto.exploitationPersonnelNum,
            postalCode: reqCreateFacilityDto.postalCode,
            address: reqCreateFacilityDto.address,
            ownership: reqCreateFacilityDto.ownership,
            coolingHeatingSystemType: reqCreateFacilityDto.coolingHeatingSystemType
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteFacility(id) {
    try {
        return await Facility.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateArea(id, reqCreateFacilityDto) {
    try {
        return await Facility.updateOne({
            _id: id
        }, {
            arenaArea: reqCreateFacilityDto.arenaArea,
            ayanArea: reqCreateFacilityDto.ayanArea,
            useFullArea: reqCreateFacilityDto.useFullArea,
            externalWallsTotalArea: reqCreateFacilityDto.externalWallsTotalArea,
            externalGlassTotalArea: reqCreateFacilityDto.externalGlassTotalArea
        });
    } catch (e) {
        console.log(e);
    }
}

async function createSpace(id, reqFacilitySpace) {
    try {
        return await Facility.updateOne({
            _id: id
        }, {
            $push: {
                spaceList: reqFacilitySpace
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateSpace(id, reqFacilitySpace) {
    try {
        return await Facility.updateOne({
            _id: id,
            spaceList: {$elemMatch: {_id: reqFacilitySpace._id}}
        }, {
            $set: {
                "spaceList.$.name": reqFacilitySpace.name,
                "spaceList.$.number": reqFacilitySpace.number,
                "spaceList.$.floorNum": reqFacilitySpace.floorNum,
                "spaceList.$.facilityUsage": reqFacilitySpace.facilityUsage,
                "spaceList.$.area": reqFacilitySpace.area
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteSpace(id, spaceId) {
    try {
        return await Facility.updateOne({
            _id: id
        }, {
            $pull: {
                spaceList: {
                    _id: spaceId
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function createMapInformation(id, reqMapInformation) {
    try {
        return await Facility.updateOne({
            _id: id
        }, {
            $push: {
                mapInformationList: reqMapInformation
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateMapInformation(id, reqMapInformation) {
    try {
        return await Facility.updateOne({
            _id: id,
            mapInformationList: {$elemMatch: {_id: reqMapInformation._id}}
        }, {
            $set: {
                "mapInformationList.$.title": reqMapInformation.title,
                "mapInformationList.$.category": reqMapInformation.category,
                "mapInformationList.$.number": reqMapInformation.number,
                "mapInformationList.$.fileLink": reqMapInformation.fileLink
            }
        });
    } catch (e) {
        console.log(e);
    }
}


async function deleteMapInformation(id, mapId) {
    try {
        return await Facility.updateOne({
            _id: id
        }, {
            $pull: {
                mapInformationList: {
                    _id: mapId
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateWallInformation(id, reqWallInformation) {
    try {
        return await Facility.updateOne({
            _id: id
        }, {
            $set: {
                wallInformation: reqWallInformation.reqWallInformation
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function getOne(id) {
    try {
        return await Facility.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getListByIdList(idList) {
    try {
        console.log(idList);
        return await Facility.find({
                _id: {$in: idList}
            },
            {
                _id: 1,
                name: 1,
                facilityUsage: 1,
                postalCode: 1
            });
    } catch (e) {
        console.log(e);
    }
}

async function getListPageableByFilter(filter, page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        let myFilter = (filter.regionId !== '') ? '{\"regionId\": \"' + filter.regionId + '\"}' : '{}';
        myFilter = JSON.parse(myFilter);

        return await Facility
            .find(myFilter,
                {
                    _id: 1,
                    name: 1,
                    regionTitle: 1,
                    facilityUsage: 1,
                    explanation:1,
                    regionId: 1,
                    createdAt: 1
                })

            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}

async function getListPageableByFilterCount(filter) {
    try {
        let myFilter = (filter.regionId !== '') ? '{\"regionId\": \"' + filter.regionId + '\"}' : '{}';
        myFilter = JSON.parse(myFilter);

        return await Facility
            .find(myFilter)
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function getListPageableByTerm(term, page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        let myFilter = (term !== '') ? '{\"name\": {$regex : \"' + term + '\"} }' : '{}';
        myFilter = JSON.parse(myFilter);

        return await Facility
            .find(myFilter,
                {
                    _id: 1,
                    name: 1,
                    facilityUsage: 1,
                    floorNum: 1,
                    arenaArea: 1,
                    ayanArea: 1,
                    useFullArea: 1,
                    coolingHeatingSystemType: 1,
                    powerSharNum: 1,//تعداد انشعاب برق
                    gasSharNum: 1,//تعداد انشعاب گاز
                    waterSharNum: 1,//تعداد انشعاب آب
                    energyCarierOthersNum: 1,// تعداد حامل های انرژی غیر 
                    postalCode: 1
                })
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}

async function getListPageableByTermCount(term) {
    try {
        let myFilter = (term !== '') ? '{\"name\": \"' + term + '\"}' : '{}';
        myFilter = JSON.parse(myFilter);

        return await Facility
            .find(myFilter)
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

