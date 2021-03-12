/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String},
    mobile: {type: String, unique: true},
    isMobileVerify: {type: Boolean, default: false},
    email: {type: String, unique: true},
    isEmailVerify: {type: Boolean, default: false},
    password: {type: String, required: true},
    role: {type: String, enum: ['ADMIN', 'USER']},
    photo: {type: String},
    organizationalUnit: {type: String},
    organizationalLevel: {type: String,},
    address: {type: String},
    city: {type: String},
    province: {type: String, },
    isActive: {type: Boolean,}
}, {
    timestamps: true
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('user', UserSchema);
