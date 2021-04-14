/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
 module.exports = (app) => {
    require('./tariff/route/tariff.route')(app);
    require('./climate/route/climate.route')(app);
};
