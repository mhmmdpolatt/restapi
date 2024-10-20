const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { route } = require("./product");
const jwt = require("jsonwebtoken")
router.get("/", async (req, res) => {
    const user = await User.find();
    res.send(user);
})


//User oluşturma Post
router.post("/", async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send("Bu emailde Hesap Zaten var Lütfen Giriş Ekranına Dönün")
    }
    if (req.body.password.length < 3) {
        return res.status(400).send("Parola en az 4 Karakterli olmalı")
    }

    if (req.body.name == "") {
        return res.status(400).send("isim alanı boş bırakılamaz")
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const saveuser = await user.save();
        const token = user.createAuthToken();
        res.header("x-auth-token", token).send(saveuser) //oluşturlan tokenı header içine göndermek
    } catch (error) {
        console.log(error);

    }

})

//User Giriş Post
router.post("/auth", async (req, res) => {

    let user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send("Böyle bir Email ile hesap oluşturulmamış")
    }

    const isSucces = await bcrypt.compare(req.body.password, user.password)
    if (!isSucces) {
        return res.status(400).send("Hatalı email yada parola")
    }
  const token = user.createAuthToken();

    res.send(token)

})

module.exports = router;