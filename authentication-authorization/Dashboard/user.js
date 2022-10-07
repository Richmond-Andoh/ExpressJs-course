//dependencies
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

//connect to database
mongoose.connect("mongodb://127.0.0.1:27017/dasboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connection succesful"))
.catch(error => console.log(error))


//create a model

const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String

})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model("Users", User, "Users")