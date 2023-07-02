//User Schema
import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        require: true,
        min: 2,
        max: 50
    },
    occupation: {
        type: String,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    location: {
        type: String,
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default: []
    },
    impressions: Number,
    ViewdProfile: Number

})
const User = mongoose.model('User', userSchema); // wrapping the schema with the model
export default User; //passign the model