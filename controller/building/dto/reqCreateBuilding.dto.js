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
    this.address=data.address;
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

        if (this.address !== null && this.address !== 'undefined') {
            this.postalCode = data.postalCode;
        }

        
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
        if (
            data.useType !== 'k_01' && // =<any> 'مسکونی	',
            data.useType !== 'k_02' && // =<any> 'آرایشگاه	',
            data.useType !== 'k_03' && // =<any> 'زایشگاه	',
            data.useType !== 'k_04' && // =<any> 'مرکز اصلی یا شعبه بانک	',
            data.useType !== 'k_05' && // =<any> 'خانه بهداشت	',
            data.useType !== 'k_06' && // =<any> 'دانشسرا و مرکز تربیت معلم	',
            data.useType !== 'k_07' && // =<any> 'فروشگاه	تعمیرگاه بزرگ',
            data.useType !== 'k_08' && // =<any> 'بیمارستان	',
            data.useType !== 'k_09' && // =<any> 'آزمایشگاه	',
            data.useType !== 'k_10' && // =<any> 'سردخانه	',
            data.useType !== 'k_11' && // =<any> 'ایستگاه اصلی و مرکز کنترل مترو	',
            data.useType !== 'k_12' && // =<any> 'ساختمان پست و پلیس و آتشنشانی	',
            data.useType !== 'k_13' && // =<any> 'ساختمان آموزشی دانشگاهی	',
            data.useType !== 'k_14' && // =<any> 'کتابخانه	',
            data.useType !== 'k_15' && // =<any> 'کارخانه صنعتی (غیر از موارد ذکر شده در کاربری د)',
            data.useType !== 'k_16' && // =<any> 'هتل	',
            data.useType !== 'k_17' && // =<any> 'مرکز تحقیقاتی	',
            data.useType !== 'k_18' && // =<any> 'ایستگاه رادیو و تلویزیون	',
            data.useType !== 'k_19' && // =<any> 'بخش اداری ساختمان صنعتی	مجتمع فنی و حرفه ای	',
            data.useType !== 'k_20' && // =<any> 'ساختمان اداری	',
            data.useType !== 'k_21' && // =<any> 'ترمینال فرودگاه بین المللی با داخلی	',
            data.useType !== 'k_22' && // =<any> 'نمایشگاه',
            data.useType !== 'k_23' && // =<any> 'مهمانسرا	',
            data.useType !== 'k_24' && // =<any> 'خوابگاه	',
            data.useType !== 'k_25' && // =<any> 'مرکز اصلی یا فرعی مخابرات	',
            data.useType !== 'k_26' && // =<any> 'ساختمان آموزشی	',
            data.useType !== 'k_27' && // =<any> 'سالن غذا خوری	',
            data.useType !== 'k_28' && // =<any> 'ساختمان تجاری بزرگ	',
            data.useType !== 'k_29' && // =<any> 'استادیوم ورزشی سرپوشیده	',
            data.useType !== 'k_30' && // =<any> 'باشگاه',
            data.useType !== 'k_31' && // =<any> 'تئاتر	',
            data.useType !== 'k_32' && // =<any> 'ساختمان ایستگاه وسایل نقلیه زمینی	',
            data.useType !== 'k_33' && // =<any> 'تعمیرگاه کوچک	',
            data.useType !== 'k_34' && // =<any> 'سیلو و مشابه آنها	',
            data.useType !== 'k_35' && // =<any> 'آشیانه حفاظتی هواپیما	',
            data.useType !== 'k_36' && // =<any> 'ایستگاه فرعی مترو	',
            data.useType !== 'k_37' && // =<any> 'نورد و ذوب فلزات	',
            data.useType !== 'k_38' && // =<any> 'سالن اجتماع و کنفرانس',
            data.useType !== 'k_39' && // =<any> 'سینما	',
            data.useType !== 'k_40' && // =<any> 'ترمینال راه آهن	',
            data.useType !== 'k_41' && // =<any> 'کارخانه صنعتی اتومبیل سازی',
            data.useType !== 'k_42' && // =<any> 'پارکینگ در طبقات	ساختمان ',
            data.useType !== 'k_43' && // =<any> 'میدان های میوه و تره بار	',
            data.useType !== 'k_44' && // =<any> 'پناهگاه	',
            data.useType !== 'k_45' && // =<any> 'انبار	',
            data.useType !== 'k_46'  // =<any> 'ساختمان گشتارگاه',
         ) {
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