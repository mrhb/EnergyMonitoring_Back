const mongoose = require('mongoose');

const ForgetPasswordSchema = mongoose.Schema({
    userId: {type: String, required: true},
    tokenType: {type: String, required: true},
    token: {type: String, required: true, enum: ['SMS', 'EMAIL']},
    expireDate: {type: Date, required: true}
}, {
    timestamps: true
});


module.exports = mongoose.model('forgetPassword', ForgetPasswordSchema);
