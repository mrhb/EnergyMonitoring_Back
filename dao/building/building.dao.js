/**
 * @author MjImani
 * phone : +989035074205
 */

const Building = require('../../model/building/building.model');

module.exports = {
    create,
    update,
    updateArea,
    createSpace,
    updateSpace,
    deleteSpace,
    createMapInformation,
    updateMapInformation,
    deleteMapInformation,
    updateWallInformation,
    getOne
};

async function create(reqCreateBuildingDto) {
    try {
        return await Building.create({
            regionId: reqCreateBuildingDto.regionId,
            name: reqCreateBuildingDto.name,
            useType: reqCreateBuildingDto.useType,
            constructionYear: reqCreateBuildingDto.constructionYear,
            floorNum: reqCreateBuildingDto.floorNum,
            exploitationPersonnelNum: reqCreateBuildingDto.exploitationPersonnelNum,
            postalCode: reqCreateBuildingDto.postalCode,
            address: reqCreateBuildingDto.address,
            ownership: reqCreateBuildingDto.ownership,
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
            name: reqCreateBuildingDto.name,
            useType: reqCreateBuildingDto.useType,
            constructionYear: reqCreateBuildingDto.constructionYear,
            floorNum: reqCreateBuildingDto.floorNum,
            exploitationPersonnelNum: reqCreateBuildingDto.exploitationPersonnelNum,
            postalCode: reqCreateBuildingDto.postalCode,
            address: reqCreateBuildingDto.address,
            ownership: reqCreateBuildingDto.ownership,
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
                "mapInformationList.$.uploadDate": reqMapInformation.uploadDate,
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
