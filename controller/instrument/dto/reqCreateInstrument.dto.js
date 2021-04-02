/**
 * @author MjImani
 * phone : +989035074205
 */
module.exports = ReqCreateInstrument;

function ReqCreateInstrument(data, userId, next) {
    validate(data, next);
    if (data.name !== null && data.name !== 'undefined') {
        this.name = data.name;
    }
    if (this.address !== null && this.address !== 'undefined') {
        this.address = data.address;
    }
    this.billingId = data.billingId;
    if (this.city !== null && this.city !== 'undefined') {
        this.city = data.city;
    }
    if (this.domainCode !== null && this.domainCode !== 'undefined') {
        this.domainCode = data.domainCode;
    }
    this.addressCode = data.addressCode;
    if (this.numberShare !== null && this.numberShare !== 'undefined') {
        this.numberShare = data.numberShare;
    }
    if (this.fileNumber !== null && this.fileNumber !== 'undefined') {
        this.fileNumber = data.fileNumber;
    }
    if (this.serialShare !== null && this.serialShare !== 'undefined') {
        this.serialShare = data.serialShare;
    }
    this.instrumentCarrier = data.instrumentCarrier;
    this.instrumentUnit = data.instrumentUnit;
    this.instrumentNum = data.instrumentNum;
    this.instrumentUsage = data.instrumentUsage;
    this.consumptionPower =data.consumptionPower;
    this.consumptionUnit=data.consumptionUnit;

    this.dailyOperatHours=data.dailyOperatHours;
    this.AnnualWorkDayNum=data.AnnualWorkDayNum;
    this.fromDate=data.fromDate;
    this.toDate=data.toDate;
    this.coincidenceCoefficient=data.coincidenceCoefficient;

    this.creatorId = userId;
    this.ownerId = userId;
}
function validate(data, next) {
    if (!data.instrumentUsage) {
        throw next("کاربری تجهیز نمی تواند خالی باشد.");
    }
    if (!data.name) {
        throw next("نام تجهیز نمی تواند خالی باشد.");
    }
    if (data.instrumentUsage !== 'CENTERALAIRCONDITION' && data.instrumentUsage !== 'LOCALAIRCONDITION' &&
    data.instrumentUsage !== 'OFICE' && data.instrumentUsage !== 'LIGHTING' && data.instrumentUsage !== 'SERVER' &&
    data.instrumentUsage !== 'KITCHEN' && data.instrumentUsage !== 'OTHERS' ) {
        throw next("نوع کاربری تجهیز درست انتخاب نشده است.");}
    if (!data.name) {
        throw next("نام تجهیز نمی تواند خالی باشد.");}
    if (data.instrumentUsage === 'CENTERALAIRCONDITION') {
        if (data.name !== 'HOT_WATER_BOILER' && data.name !== 'BOILER' && data.name !== 'COLD_WATER_COMPRESSION_CHILLER' && 
        data.name !== 'COOL_AIR_COMPRESSION_CHILLER' && data.name !== 'ABSORPTION_CHILLER_' && data.name !== 'COOLING_TOWER' &&
        data.name !== 'AIR_CONDITIONER' && data.name !== 'AIRWASHER' && data.name !== 'PUMP' && data.name !== 'OTHER1' ) {
            throw next(" نام تاسیسات مرکزی تهویه مطبوع درست انتخاب نشده است.");}} 
    else if (data.instrumentUsage === 'LOCALAIRCONDITION') {
        if (data.name !== 'WINDOW_AIR_CONDITIONER' && data.name !== 'SPLIT' && data.name !== 'FAN_COIL' && data.name !== 'WATER_COOLER'
        && data.name !== 'RADIATOR' && data.name !== 'PACKAGE' && data.name !== 'WATER_HEATER' && data.name !== 'OTHER2' ) {
            throw next("نام تاسیسات موضعی تهویه مطبوع درست انتخاب نشده است.");  }} 
    else if (data.instrumentUsage === 'OFICE') {
        if (data.name !== 'COMPUTER' && data.name !== 'LAPTOP' && data.name !== 'LASER_PRINTER' && data.name !== 'INKJET_PRINTER'
        && data.name !== 'THREE_WORKS' && data.name !== 'SCANNER' && data.name !== 'FAX' && data.name !== 'PHOTOCOPY' && data.name !== 'OTHER3' ) {
            throw next("نام تجهیزات اداری پر کاربرد درست انتخاب نشده است.");}} 
    else if (data.instrumentUsage === 'LIGHTING') {
        if (data.name !== 'LOW_CONSUMPTION' && data.name !== 'LED' && data.name !== 'MOONLIGHT' && data.name !== 'FPL'
        && data.name !== 'SODIUM_VAPOR' && data.name !== 'METAL_HALLIDAY' && data.name !== 'MERCURY_VAPOR' 
        && data.name !== 'STRING' && data.name !== 'HALOGEN' && data.name !== 'OTHER4' ) {
            throw next("نام تجهیزات روشنایی درست انتخاب نشده است.");}}
    else if (data.instrumentUsage === 'SERVER') {
        if (data.name !== 'SERVER' && data.name !== 'SWITCH' && data.name !== 'OTHER5'  ) {
            throw next("نام تجهیزات سروری درست انتخاب نشده است.");}} 
    else if (data.instrumentUsage === 'SERVER') {
        if (data.name !== 'REFRIGERATOR' && data.name !== 'MICROWAVE' && data.name !== 'DESKTOP_GAS' &&
        data.name !== 'KETTLE_AND_SAMOVAR' && data.name !== 'TEA_MAKER' && data.name !== 'INDUSTRIAL_GAS' &&
        data.name !== 'BARBECUE' && data.name !== 'HOOD' && data.name !== 'AIR_DISCHARGE_FAN' && data.name !== 'OTHER6' ) {
            throw next("نام تجهیزات آبدارخانه و آشپزخانه درست انتخاب نشده است.");}} 
    else if (data.instrumentUsage === 'SERVER') {
        if (data.name !== 'TELEVISION' && data.name !== 'FAN' && data.name !== 'WATER_COOLING' &&
            data.name !== 'PAPER_EATER' && data.name !== 'VIDEO_PROJECTOR' && data.name !== 'DRY_YOUR_HANDS' &&
            data.name !== 'ELEVATOR' && data.name !== 'WASHING_MACHINE' && data.name !== 'VACUUM_CLEANER' && data.name !== 'OTHER7' ) {
                throw next("نام تجهیزات متفرقه درست انتخاب نشده است.");}}
}
    