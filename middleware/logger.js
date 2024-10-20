const { transports, createLogger, format } = require("winston")
const { combine, timestamp, prettyPrint } = format
const username = "mdpolat";
const password = "VHTU0ZQdWZ5GwIQj"
const database = "shoppdb"
require("winston-mongodb")

const logger = createLogger({
    
    format: combine(

        timestamp({
            format: "MMM-DD-YYYY HH:mm:ss"
        }),
        prettyPrint()

    )

    ,
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs.log",level:"error" }),
        new transports.MongoDB({
            level:"error",
            db: `mongodb+srv://${username}:${password}@cluster0.1o6hn.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`,
            options:{
                useUnifiedTopology:true
            },
            collection:"server_logs"
        })
    ]

})
module.exports = logger