const { timeStamp } = require("console");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
var currentdate = new Date()

var postSchema = new Schema({
    razorID: String,
    orderStatus: String,
    date: {
        type: Date,
        default: "Last Sync: " + currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/" 
        + currentdate.getFullYear() + " @ "  
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds()
    },
    total: String,
    orderSKU: String,
    shippingID: String
}) 

const Model = mongoose.model("order", postSchema)

module.exports = Model