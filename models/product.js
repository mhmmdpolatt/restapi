const mongoose = require("mongoose")

const commentSchema=mongoose.Schema({
    text:String,
    userName:String,
    date:{
        type:Date,
        default:Date.now
    }
})

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    imageUrl:String,
    date:{
        type:Date,
        default:Date.now
    },
    isActive:Boolean,
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"kategoriler"
    },
    comments:[commentSchema]
})
const Product=mongoose.model("Product",productSchema)
const Comments=mongoose.model("Comments",commentSchema)

module.exports={Product,Comments}