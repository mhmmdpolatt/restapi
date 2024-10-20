const mongoose = require("mongoose");
const { Schema } = mongoose
const jwt = require("jsonwebtoken")

const userSchema = Schema({
    name: {
        type: String,
        required: true //Zorunlu alan
    },
    email: {
        type: String,
        required: true,
        unique: true  //bir mailden sadece bir tane olabilir demek
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: Boolean


}, { timestamps: true })


userSchema.methods.createAuthToken = function () { //arrow function thisi tanımadığı için klasik fonkisyona dönüştürdüm
    const decodedtoken = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin

    }, "jwtkey")
    return decodedtoken
}


const User = mongoose.model("User", userSchema)
module.exports = User