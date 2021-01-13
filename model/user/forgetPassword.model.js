/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const ForgetPasswordSchema = new Schema({
    userId: {type: String, required: true},
    tokenType: {type: String, required: true, enum: ['SMS', 'EMAIL']},
    mobile: {type: String},
    email: {type: String},
    token: {type: String, required: true},
    expireDate: {type: Date, required: true}
}, {
    timestamps: true
});


module.exports = mongoose.model('forgetPassword', ForgetPasswordSchema);
