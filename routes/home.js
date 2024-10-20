const express = require("express");
const router = express.Router();

const products = [
    { id: 1, name: "samsung15", price: 5000 },
    { id: 2, name: "samsung16", price: 8000 },
    { id: 3, name: "samsung17", price: 5000 },
    { id: 4, name: "samsung18", price: 1000 },
]

router.get("/", (req, res) => {
    res.send(products[0])
})

module.exports=router