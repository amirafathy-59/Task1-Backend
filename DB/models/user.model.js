import mongoose from "mongoose";
// import bcrypt from "bcrypt"
const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'user name is required'],
        minLength: [1, 'too short user name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email is required'],
        minLength: 1,
        unique: [true, 'email must be unique']
    }, 
}, { timestamps: true })



export const userModel = mongoose.model('user', userSchema)



