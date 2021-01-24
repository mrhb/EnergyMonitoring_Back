/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqBuildingPageFilterDto;

function ReqBuildingPageFilterDto(data) {
    if (data.regionId){
        this.regionId = data.regionId;
    }else {
        this.regionId = "";
    }
}
