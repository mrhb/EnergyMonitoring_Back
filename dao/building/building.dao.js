/**
 * @author MjImani
 * phone : +989035074205
 */

const Building = require('../../model/building/building.model');
const mongoose = require('../../config/mongoose').mongoose;

module.exports = {
    createBuilding,
    createFacility,
    update,
    deleteBuilding,
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
    getBuildingListPageableByFilter,
    getFacilityListPageableByFilter,
    getListPageableByTermForSelection,
    getListByRegionFilter,
    getBuildingListPageableByFilterCount,
    getFacilityListPageableByFilterCount,
    getListPageableByTerm,
    getListPageableByTermCount
};

async function createBuilding(reqCreateBuildingDto) {
    try {
        return await Building.create({
            regionId: reqCreateBuildingDto.regionId,
            regionTitle: reqCreateBuildingDto.regionTitle,
            name: reqCreateBuildingDto.name,
            utilityType: reqCreateBuildingDto.utilityType,
            useType: reqCreateBuildingDto.useType,
            constructionYear: reqCreateBuildingDto.constructionYear,
            floorNum: reqCreateBuildingDto.floorNum,
            exploitationPersonnelNum: reqCreateBuildingDto.exploitationPersonnelNum,
            postalCode: reqCreateBuildingDto.postalCode,
            address: reqCreateBuildingDto.address,
            ownership: reqCreateBuildingDto.ownership,
            heatingSystemType: reqCreateBuildingDto.heatingSystemType,
            coolingSystemType: reqCreateBuildingDto.coolingSystemType,            
            creatorId: reqCreateBuildingDto.creatorId,
            ownerId: reqCreateBuildingDto.ownerId,
            waterSharingNum: reqCreateBuildingDto.waterSharingNum,
            powerSharingNum: reqCreateBuildingDto.powerSharingNum,
            gasSharingNum: reqCreateBuildingDto.gasSharingNum,
            nonEnergyCarrierSharingNum: reqCreateBuildingDto.nonEnergyCarrierSharingNum,
            arenaArea: reqCreateBuildingDto.arenaArea,
            ayanArea: reqCreateBuildingDto.ayanArea,
            useFullArea: reqCreateBuildingDto.useFullArea,
            externalWallsTotalArea: reqCreateBuildingDto.externalWallsTotalArea,
            externalGlassTotalArea: reqCreateBuildingDto.externalGlassTotalArea,
            
        });
    } catch (e) {
        console.log(e);
    }
}


async function createFacility(reqCreateBuildingDto) {
    try {
        return await Building.create({
            regionId: reqCreateBuildingDto.regionId,
            name: reqCreateBuildingDto.name,
            utilityType: reqCreateBuildingDto.utilityType,
            explanation: reqCreateBuildingDto.explanation, //توضیحات
            capacitorBank: reqCreateBuildingDto.capacitorBank, //بانک خازنی تأسیس
            useType: reqCreateBuildingDto.useType,
            address: reqCreateBuildingDto.address,      
            creatorId: reqCreateBuildingDto.creatorId,
            ownerId: reqCreateBuildingDto.ownerId,
        });
    } catch (e) {
        console.log(e);
    }
}

async function update(id, reqCreateBuildingDto) {
    try {
        return await Building.updateOne({
            _id: id
        }, {
            regionId: reqCreateBuildingDto.regionId,
            regionTitle: reqCreateBuildingDto.regionTitle,
            name: reqCreateBuildingDto.name,
            useType: reqCreateBuildingDto.useType,
            constructionYear: reqCreateBuildingDto.constructionYear,
            floorNum: reqCreateBuildingDto.floorNum,
            exploitationPersonnelNum: reqCreateBuildingDto.exploitationPersonnelNum,
            postalCode: reqCreateBuildingDto.postalCode,
            address: reqCreateBuildingDto.address,
            ownership: reqCreateBuildingDto.ownership,
            waterSharingNum: reqCreateBuildingDto.waterSharingNum,
            powerSharingNum: reqCreateBuildingDto.powerSharingNum,
            gasSharingNum: reqCreateBuildingDto.gasSharingNum,
            nonEnergyCarrierSharingNum: reqCreateBuildingDto.nonEnergyCarrierSharingNum,
            heatingSystemType: reqCreateBuildingDto.heatingSystemType,
            coolingSystemType: reqCreateBuildingDto.coolingSystemType,     
            arenaArea: reqCreateBuildingDto.arenaArea,
            ayanArea: reqCreateBuildingDto.ayanArea,
            useFullArea: reqCreateBuildingDto.useFullArea,
            externalWallsTotalArea: reqCreateBuildingDto.externalWallsTotalArea,
            externalGlassTotalArea: reqCreateBuildingDto.externalGlassTotalArea 
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteBuilding(id) {
    try {
        return await Building.deleteOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateArea(id, reqCreateBuildingDto) {
    try {
        return await Building.updateOne({
            _id: id
        }, {
            arenaArea: reqCreateBuildingDto.arenaArea,
            ayanArea: reqCreateBuildingDto.ayanArea,
            useFullArea: reqCreateBuildingDto.useFullArea,
            externalWallsTotalArea: reqCreateBuildingDto.externalWallsTotalArea,
            externalGlassTotalArea: reqCreateBuildingDto.externalGlassTotalArea
        });
    } catch (e) {
        console.log(e);
    }
}

async function createSpace(id, reqBuildingSpace) {
    try {
        return await Building.updateOne({
            _id: id
        }, {
            $push: {
                spaceList: reqBuildingSpace
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function updateSpace(id, reqBuildingSpace) {
    try {
        return await Building.updateOne({
            _id: id,
            spaceList: {$elemMatch: {_id: reqBuildingSpace._id}}
        }, {
            $set: {
                "spaceList.$.name": reqBuildingSpace.name,
                "spaceList.$.number": reqBuildingSpace.number,
                "spaceList.$.floorNum": reqBuildingSpace.floorNum,
                "spaceList.$.useType": reqBuildingSpace.useType,
                "spaceList.$.area": reqBuildingSpace.area
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function deleteSpace(id, spaceId) {
    try {
        return await Building.updateOne({
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
        return await Building.updateOne({
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
        return await Building.updateOne({
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
        return await Building.updateOne({
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
        return await Building.updateOne({
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
        return await Building.findOne({
            _id: id
        });
    } catch (e) {
        console.log(e);
    }
}

async function getListByIdList(idList) {
    try {
        console.log(idList);
        return await Building.find({
                _id: {$in: idList}
            },
            {
                _id: 1,
                name: 1,
                utilityType:1,
            });
    } catch (e) {
        console.log(e);
    }
}

async function getBuildingListPageableByFilter(filter, page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        let myFilter = (filter.regionId !== '') ? '{\"regionId\": \"' + filter.regionId + '\"}' : '{}';
        myFilter = JSON.parse(myFilter);
        myFilter.utilityType="BUILDING";

      
        return await Building
            .find(
                  {
            "regionId": {$in: filter.regionIds},
            "utilityType":"BUILDING"
        }
        ,
                {
                    _id: 1,
                    name: 1,
                    useType: 1,
                    postalCode: 1,
                    constructionYear: 1,
                    floorNum: 1,
                    coolingSystemType: 1,// سیستم سرمایشی 
                    heatingSystemType: 1,// سیستم گرمایشی 
                    powerSharingNum: 1,//تعداد انشعاب برق
                    gasSharingNum: 1,//تعداد انشعاب گاز
                    waterSharingNum: 1,//تعداد انشعاب آب
                    nonEnergyCarrierSharingNum: 1,// تعداد حامل های انرژی غیر 
                    arenaArea: 1,  //مساحت عرصه
                    ayanArea: 1,//مساحت اعیان
                    useFullArea: 1,//مساحت مفید
                    externalWallsTotalArea: 1,// مساحت کل جداره های خارجی 
                    externalGlassTotalArea: 1,// مساحت کل شیشه های خارجی 
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


async function getFacilityListPageableByFilter(filter, page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        let myFilter = (filter.regionId !== '') ? '{\"regionId\": \"' + filter.regionId + '\"}' : '{}';
        myFilter = JSON.parse(myFilter);
        myFilter.utilityType="FACILITY";

        return await Building
            .find(myFilter,
                {
                    _id: 1,
                    name: 1,
                    useType: 1,
                    regionId: 1,
                    explanation:1,
                    createdAt: 1                  
                })

            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}



async function getListByRegionFilter(regionId) {
    try {
        let myFilter = (regionId !== '') ? '{\"regionId\": \"' + regionId + '\"}' : '{}';
        myFilter = JSON.parse(myFilter);

        return await Building
            .find(myFilter,
                {
                    _id: 1,
                    name: 1,
                    // useType: 1,
                    // postalCode: 1,
                    // floorNum: 1,
                    // arenaArea: 1,
                    // ayanArea: 1,
                    // useFullArea: 1,
                    // coolingHeatingSystemType: 1,
                    // powerSharNum: 1,//تعداد انشعاب برق
                    // gasSharNum: 1,//تعداد انشعاب گاز
                    // waterSharNum: 1,//تعداد انشعاب آب
                    // energyCarierOthersNum: 1,// تعداد حامل های انرژی غیر 
                    regionId: 1,
                    constructionYear: 1,
                    createdAt: 1
                })

            .sort({createdAt: -1});
    } catch (e) {
        console.log(e);
    }
}

async function getBuildingListPageableByFilterCount(filter) {
    try {
        let myFilter = (filter.regionId !== '') ? '{\"regionId\": \"' + filter.regionId + '\"}' : '{}';
        myFilter = JSON.parse(myFilter);
        myFilter.utilityType="BUILDING";


        return await Building
            .find(myFilter)
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

async function getFacilityListPageableByFilterCount(filter) {
    try {
        let myFilter = (filter.regionId !== '') ? '{\"regionId\": \"' + filter.regionId + '\"}' : '{}';
        myFilter = JSON.parse(myFilter);
        myFilter.utilityType="FACILITY";

        return await Building
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

        return await Building
            .find(myFilter,
                {
                    _id: 1,
                    name: 1,
                    useType: 1,
                    floorNum: 1,
                    coolingSystemType: 1,
                    heatingSystemType: 1,
                    powerSharingNum: 1,//تعداد انشعاب برق
                    gasSharingNum: 1,//تعداد انشعاب گاز
                    waterSharingNum: 1,//تعداد انشعاب آب
                    nonEnergyCarrierSharingNum: 1,// تعداد حامل های انرژی غیر 
                    arenaArea: 1,  //مساحت عرصه
                    ayanArea: 1,//مساحت اعیان
                    useFullArea: 1,//مساحت مفید
                    externalWallsTotalArea: 1,// مساحت کل جداره های خارجی 
                    externalGlassTotalArea: 1,// مساحت کل شیشه های خارجی 
                    postalCode: 1
                })
            .sort({createdAt: -1})
            .skip(Number(skip))
            .limit(Number(size));
    } catch (e) {
        console.log(e);
    }
}



async function getListPageableByTermForSelection(term, page, size) {
    try {
        let skip = (page * size);
        if (skip < 0) {
            skip = 0;
        }
        let myFilter = (term !== '') ? '{\"name\": {$regex : \"' + term + '\"} }' : '{}';
        myFilter = JSON.parse(myFilter);

        return await Building
            .find(myFilter,
                {
                    _id: 1,
                    name: 1,
                    utilityType:1,
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

        return await Building
            .find(myFilter)
            .countDocuments();
    } catch (e) {
        console.log(e);
    }
}

