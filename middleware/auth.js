const jwt = require('jsonwebtoken');
const config=require("config")
function auth(req, res, next) {
    // Header'dan token'i alıyoruz
    const token = req.header("x-auth-token");

    // Token yoksa 401 Unauthorized hatası dön
    if (!token) {
        return res.status(401).send("Yetkisiz işlem, token gerekli.");
    }

    // Token varsa onu doğruluyoruz
    try {
        // jwt.verify ile token doğrulaması yapılıyor
        const decoded = jwt.verify(token, config.get("jwtkey"));
        req.user = decoded; // Doğrulanmış kullanıcı bilgilerini req.user'a kaydediyoruz
        next(); // Middleware zincirine devam ediyoruz
    } catch (ex) {
        if (ex.name === 'TokenExpiredError') {
            return res.status(401).send("Token süresi dolmuş.");
        } else if (ex.name === 'JsonWebTokenError') {
            return res.status(400).send("Geçersiz token.");
        } else {
            return res.status(500).send("Sunucu hatası.");
        }
    }
}

module.exports = auth;
