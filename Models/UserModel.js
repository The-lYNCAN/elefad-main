const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var postSchema = new Schema({
    username: String,
    password: String,
    First_Name: String,
    Last_Name: String,
    Email: String,
    facebookId: String
})

const Model = mongoose.model("user", postSchema)

module.exports = Model