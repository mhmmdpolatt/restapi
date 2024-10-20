module.exports = function (req, res, next) {
    if (!req.user.isAdmin) {
        res.status(403).send("Erişim Yetkiniz Yok") //code 403 erişim yektisi yoksa diye
    }
    next() // middleware kaldığı yerden devam etsin
}