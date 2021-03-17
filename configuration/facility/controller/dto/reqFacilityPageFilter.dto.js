/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqFacilityPageFilterDto;

function ReqFacilityPageFilterDto(data) {
    if (data.regionId){
        this.regionId = data.regionId;
    }else {
        this.regionId = "";
    }
}
