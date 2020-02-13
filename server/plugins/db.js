module.exports = function (app) {

    const mongoose = require("mongoose");
    mongoose.connect("mongodb://root:a123456@ds063946.mlab.com:63946/moba",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


}