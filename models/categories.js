const mongoose=require("mongoose")

const categoriesSchema=mongoose.Schema(
    {
        name:String,
        products:[
            {type:mongoose.Schema.Types.ObjectId,ref:"Product"}
        ]
    }
)

module.exports=mongoose.model("kategoriler",categoriesSchema)