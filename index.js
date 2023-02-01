const express = require("express")
const cors = require("cors")
require("dotenv").config()
const { connection } = require("./Config/db.js")
const { dataController } = require("./Routes/data.routes.js")


const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("welcome")
})

app.use("/zoho", dataController)


app.listen(7500, async () => {
    try {
        await connection
        console.log("connected")
    }
    catch (err) {
        console.log("not connected")
        console.log(err)
    }
    console.log("linstening to port 7500")

    //console.log(process.env.MONGO_URL)
})