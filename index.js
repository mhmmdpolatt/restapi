
const express = require("express");
const config = require("config")

const product = require("./routes/product");
const home = require("./routes/home")
const categories = require("./routes/categories")
const users = require("./routes/users")
const app = express();
const mongoose = require("mongoose");
const logger = require("./middleware/error");
const error = require("./middleware/error");


if (process.env.NODE_ENV == "production") {
    require("./startup/produciton")(app);
}
app.use(express.json()) // 

//http methods get,post,delete,put konuları 

app.use(home)
app.use(product)
app.use("/api/categories", categories)
app.use("/api/users", users)
app.use(error)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") //tüm kaynaklardan gelen istekleri kabul etmek için yani başka tarayıcılar farklı adreslerden istek atabilisni
    res.setHeader("Access-Control-Allow-Methods", "GET") //Sadece Get metodu için istek oluşturabilirler
    next();
})

//mongodb+srv://mdpolat:<db_password>@cluster0.1o6hn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 servis bağlantım
//mongoose--sequileze gibi 
//VHTU0ZQdWZ5GwIQj parola

const username = config.get("db.username")
const password = config.get("db.password")
const database = config.get("db.database")

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.1o6hn.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log("mongo db başarılya bağlandın");
    })
    .catch((err) => {
        console.log(err);
    })

// ŞEMA OLUŞTURMA












//Prdoucttan nesne oluşturacaz

const port = process.env.PORT || 3000;
// console.log(process.env);
console.log(app.get("env")); //undefined ise development modunda
console.log(config.get("name"));
console.log(process.env.DB_PASSWORD);



if (app.get("env") == "development") {
    console.log("Uygulama Geliştirme Aşamasında");

} else {
    console.log("Produciton");

}


app.listen(port, () => {
    console.log(`${port} portta çalışıyor 
        
        http://127.0.0.1:${port}/
        
        `);

})
