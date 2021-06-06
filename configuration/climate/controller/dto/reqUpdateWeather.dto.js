/**
 * @author KpourBadakhshan
 * Email : k_pour@yahoo.com
 */
module.exports = ReqUpdateWeather;

function ReqUpdateWeather(data,  next) {
    validate(data, next);
// استان
    if (data.province !== null && data.province !== 'undefined') {
        this.province = data.province;
    }
//  نوع اقلیم 
    if (data.climateType !== null && data.climateType !== 'undefined') {
        this.climateType = data.climateType;
    }
// شهر    
    if (this.city !== null && this.city !== 'undefined') {
        this.city = data.city;
    }
    //روستا
    if (this.village !== null && this.village !== 'undefined') {
        this.village = data.village;
    }
    // طول جغرافیایی
    if (this. longitude !== null && this. longitude !== 'undefined') {
        this. longitude = data. longitude;
    }
    // عرض جغرافیایی 
    if (this. latitude !== null && this. latitude !== 'undefined') {
        this.latitude = data.latitude;
    }
    // ارتفاع از سطح دریا
    if (this. height !== null && this. height !== 'undefined') {
        this.height = data.height;
    }
    // نیاز غالب حرارتی
    if (this. dominantThermalReq !== null && this. dominantThermalReq !== 'undefined') {
        this.dominantThermalReq = data.dominantThermalReq;
    }
    // درجه انرژی
    if (this. energyDegree !== null && this. energyDegree !== 'undefined') {
        this.energyDegree = data.energyDegree;
    }
}


///
function validate(data, next) {
    if (!data.id) {
        throw next("شناسه اقلیم نمیتواند خالی باشد.");
    }

    if (!data.climateType) {
        throw next("نوع اقلیم نمیتواند خالی باشد.");
    }
    if (data.climateType !== 'VERYCOLD' && data.climateType !== 'COLD' && data.climateType !== 'TEMPER_RAINY' &&
    data.climateType !== 'SEMI_TEMPER_RAINY' && data.climateType !== 'SEMI_DRY' && data.climateType !== 'HOT_DRY' &&
    data.climateType !== 'VERY_HOT_DRY' && data.climateType !== 'VERY_HOT_HUMID' ) {
        throw next("نوع اقلیم درست انتخاب نشده است.");
    }
}
