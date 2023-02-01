const mongoose = require("mongoose")

const datascheme = new mongoose.Schema({
    data: Array
})
const DataModel = mongoose.model("data", datascheme)


module.exports = { DataModel }