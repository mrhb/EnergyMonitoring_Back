/**
 * @author MjImani
 * phone : +989035074205
 */
const mongoose = require('../../config/mongoose').mongoose;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, unique: true, required: true},
    mobile: {type: String, unique: true, required: true},
    isMobileVerify: {type: Boolean, default: false},
    email: {type: String, unique: true, required: true},
    isEmailVerify: {type: Boolean, default: false},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['ADMIN', 'USER']},
    photo: {data: Buffer, contentType: String},
    organizationalUnit: {type: String, required: true},
    organizationalLevel: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    province: {type: String, required: true},
    isActive: {type: Boolean, required: true}
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
