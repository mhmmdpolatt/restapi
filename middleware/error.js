
const logger=require("./logger")
module.exports = function (err, req, res, next) {
    //logging
    logger.log("error",err.message)
    res.status(500).send("hata oluştu")
}