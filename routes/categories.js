const express = require("express");
const router = express.Router();
const Categories=require("../models/categories");
const { route } = require("./product");

router.get("/", async(req,res)=>{
    const result=await Categories.find().populate("products")
    res.send(result)

})

router.post("/",async (req,res) => {
    const categori= new Categories({
        name:req.body.name,
        products:req.body.products
    })

    try {
        const result =await categori.save();
        res.send(result)
    } catch (error) {
        console.log(error);
        
    }
    
})

router.put("/:id",async(req,res)=>{
    const result = await Categories.updateOne({_id:req.params.id},{
        $set:{
            name:req.body.name
        }
    })
    res.send(result)
})
router.delete("/:id",async(req,res)=>{
    const result =await Categories.findByIdAndDelete(req.params.id)
    res.send(result)
})
module.exports=router