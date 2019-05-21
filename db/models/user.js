const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },

    mail: {
        type: String,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('mail is invalid');
        }
    },
    

    password: {
        type: String
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisisnodejs');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

UserSchema.statics.findByCredentials = async (mail, password) => {
    const user = await User.findOne({ mail });

    if(!user){
        throw new Error('Wrong mail');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Wrong password');
    }

    return user;
}

UserSchema.pre('save', async function (next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;