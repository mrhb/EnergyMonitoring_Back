/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreateBuilding;

function ReqCreateBuilding(data, userId, next) {
    validate(data, next);
    this.regionId = data.regionId;
    this.name = data.name;
    this.utilityType = data.utilityType;
    this.useType = data.useType;
    this.creatorId = userId;
    this.ownerId = userId;
    if (data.utilityType == 'FACILITY')
    {   
         this.explanation=data.explanation //توضیحات
         this.capacitorBank=data.capacitorBank //بانک خازنی تأسیس
    }

    if (data.utilityType == 'BUILDING')
    {   
        this.constructionYear = data.constructionYear;
        this.floorNum = data.floorNum;
        this.exploitationPersonnelNum = data.exploitationPersonnelNum;
        this.postalCode = data.postalCode;
        this.waterSharingNum = data.waterSharingNum;
        this.gasSharingNum = data.gasSharingNum;
        this.powerSharingNum = data.powerSharingNum;
        this.nonEnergyCarrierSharingNum = data.nonEnergyCarrierSharingNum;

        if (this.address !== null && this.address !== 'undefined') {
            this.address = data.address;
        }

        this.ownership = data.ownership;
        this.coolingSystemType = data.coolingSystemType;
        this.heatingSystemType = data.heatingSystemType;
        this.arenaArea = data.arenaArea;
        this.ayanArea = data.ayanArea;
        this.useFullArea = data.useFullArea;
        this.externalWallsTotalArea = data.externalWallsTotalArea;
        this.externalGlassTotalArea = data.externalGlassTotalArea;
    }
}

function validate(data, next) {
    if (!data.regionId) {
        throw next("شناسه منطقه نمیتواند خالی باشد.");
    }
    if (!data.utilityType) {
        throw next("نوع utility  نمیتواند خالی باشد.");
    }
    if (data.utilityType !== 'BUILDING' && data.utilityType !== 'FACILITY') {
        throw next("نوع utility درست انتخاب نشده است.");
    }
    if (!data.name) {
        throw next("نام ساختمان نمیتواند خالی باشد.");
    }
    if (!data.useType) {
        throw next("نوع کاربری نمیتواند خالی باشد.");
    }
    
    if (data.utilityType == 'FACILITY')
    {
        if(data.useType !== 'INDUSTRIAL' && data.useType !== 'TBS_F' && data.useType !== 'CGS_F'){
            throw next("نوع کاربری تأسیس درست انتخاب نشده است.");
        }
        
        if(!data.capacitorBank){
            throw next("ظرفیت بانک خازنی نمیتواند خالی باشد.");
        }
    }

    if (data.utilityType == 'BUILDING')
    {
        if (data.useType !== 'RESIDENTIAL' && data.useType !== 'COMMERCIAL' && data.useType !== 'OFFICIAL') {
            throw next("نوع کاربری ساختمان درست انتخاب نشده است.");
        }


        if (!data.constructionYear) {
            throw next("سال ساخت نمیتواند خالی باشد.");
        }
        if (!data.floorNum) {
            throw next("تعداد طبقات نمیتواند خالی باشد.");
        }
        if (!data.exploitationPersonnelNum) {
            throw next("تعداد نفرات بهره بردار نمیتواند خالی باشد.");
        }
        if (!data.postalCode) {
            throw next("کد پستی نمیتواند خالی باشد.");
        }
        if (!data.ownership) {
            throw next("مالکیت نمیتواند خالی باشد.");
        }
        if (data.ownership !== 'STATE' && data.ownership !== 'RENT') {
            throw next("مالکیت درست انتخاب نشده است.");
        }
        if (!data.coolingSystemType) {
            throw next("نوع سیستم سرمایشی نمیتواند خالی باشد.");
        }
        if (!data.heatingSystemType) {
            throw next("نوع سیستم گرمایشی نمیتواند خالی باشد.");
        }
        if (data.coolingSystemType !== 'WATER_COOLER' && data.coolingSystemType !== 'FAN_A_CHILER'&& 
        data.coolingSystemType !== 'FAN_T_CHILER' && data.coolingSystemType !== 'AIR_T_CHILER' && 
        data.coolingSystemType !== 'PAC_DX' && data.coolingSystemType !== 'VRFOVRV' && 
            data.coolingSystemType !== 'SPLITE' && data.coolingSystemType !== 'PAC_DX') {
                throw next("نوع سیستم سرمایشی درست انتخاب نشده است.");
        }
        if (data.heatingSystemType !== 'GAS_HEATER' && data.heatingSystemType !== 'FAN_WARMWATER'&& 
        data.heatingSystemType !== 'AIR_WARMWATER' && data.heatingSystemType !== 'RADITR_WARMWATER'&& 
        data.heatingSystemType !== 'PAC_DX' && data.heatingSystemType !== 'SPLITE'&& 
        data.heatingSystemType !== 'VRFOVRV' && data.heatingSystemType !== 'FAN_STEAM' && data.heatingSystemType !== 'ARI_STEAM' ) {
                throw next("نوع سیستم گرمایشی درست انتخاب نشده است.");
        }
    }
}