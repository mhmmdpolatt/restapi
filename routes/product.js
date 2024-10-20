require('express-async-errors');
const express = require("express");
const router = express.Router();
const { Product, Comments } = require("../models/product")
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
router.get("/api/products", async (req, res, next) => {
    throw new Error("hataaa");
    

    // throw new Error("Server Hata");

    const productfind = await Product.find().populate("category")
    res.send(productfind)


    // const productfind= await Product.find({name:"samsung"}) //samsung ismi olan ürünü getirir
    // const productfind =await Product.find({name:"samsung"}).select({name:1,price:1}) seçili ürünün belirli kolonlarını getirir
    // const productfind = await Product.find({ name: { $regex: 'samsung', $options: 'i' } }).select({ name: 1 })


})
router.post("/api/products", auth, isAdmin, async (req, res) => { // html arayüzü yapmadığım için postman uygulaması üzerinden işlemler yapıyorum

    //validations
    if (!req.body.name || req.body.name.length < 4) {
        res.status(400).send("Hatalı Ürün Bilgisi")
        return
    }

    const p1 = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isActive: req.body.isActive,
            category: req.body.category,
            comments: req.body.comments
        }
    )

    try {

        const result = await p1.save();
        res.send(result)
    } catch (error) {
        console.log(error);

    }


})

//PUT METODU GÜNCELLEME 

router.put("/api/products/comment/:id", auth, isAdmin, async (req, res) => {

    const result = await Product.findById(req.params.id)
    console.log(result)
    const comment = new Comments(
        {
            text: req.body.yorum,
            userName: req.body.kuallnici
        }
    )
    console.log("***********", comment.text)
    result.comments.push(comment);
    const newproduct = await result.save();
    res.send(newproduct)

    // <const findProduct = Product.findById(req.params.id)
    // if (!findProduct) {
    //     res.status(400).send("Aradığınız Ürün Bulunamadı");
    //     return
    // }
    // if (!req.body.name || req.body.name.length < 4) {
    //     res.status(400).send("Hatalı Ürün Bilgisi")
    //     return
    // }
    // findProduct.name = req.body.name;
    // findProduct.price = req.body.price;
    // res.send(findProduct)>
})

router.put("/api/products/:id", auth, isAdmin, async (req, res) => {

    const result = await Product.updateOne({ _id: req.params.id }, { //update çalışmıyor updateOne olması lazım
        $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            isActive: req.body.isActive
        }
    })
    res.send(result)

    // <const findProduct = Product.findById(req.params.id)
    // if (!findProduct) {
    //     res.status(400).send("Aradığınız Ürün Bulunamadı");
    //     return
    // }
    // if (!req.body.name || req.body.name.length < 4) {
    //     res.status(400).send("Hatalı Ürün Bilgisi")
    //     return
    // }
    // findProduct.name = req.body.name;
    // findProduct.price = req.body.price;
    // res.send(findProduct)>
})

//DELETE METODU
router.delete("/api/products/comment/:id", auth, async (req, res) => {

    try {
        // Ürünü ID ile bul
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send("Ürün bulunamadı");
        }

        // Silinecek yorumu bul
        // product.comments.pull(req.body.id);

        //TÜm yorumları sil
        product.comments = []
        // Değişiklikleri kaydet
        await product.save();

        res.send(product);
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).send("Yorum silinemedi");
    }

})
router.delete("/api/products/:id", auth, isAdmin, async (req, res) => {
    const id = req.params.id
    const findProduct = await Product.findByIdAndDelete(id);

    if (!findProduct) {
        res.status(400).send("Aradığınız Ürün Bulunamadı");
        return
    }


    res.send(findProduct)
})

router.get("/api/products/:id", auth, async (req, res) => {
    const findProduct = await Product.findById(req.params.id)
    if (!findProduct) {
        res.status(400).send("Aradığınız Ürün Bulunamadı");

    }
    res.send(findProduct)
})



module.exports = router