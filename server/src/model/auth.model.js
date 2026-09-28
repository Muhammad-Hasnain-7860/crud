import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
    name : {
        required : true,
        minLength : 3,
        maxLength : 50,
        type : String
    },

    email : {
        required : true,
        type : String,
        match : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique : true
    },

    password : {
        required: true,
        type : String,
        minLength : 6
    },

    confirmPassword : {
        type : String,
        required : true,
        minLength : 6
    },
    
    refreshToken : {
        type : String
    }
})

const authModel = mongoose.model('users' , authSchema)

export default authModel