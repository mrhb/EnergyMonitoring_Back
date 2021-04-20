/**
 * @author M.Reza Hajjar
 * phone : +989151575793
 */
 module.exports = (app) => {

    require('./suscriptions/suscriptions.route')(app);
    require('./bills/bills.analysis.route')(app);
    require('./label/label.analysis.route')(app);

};
