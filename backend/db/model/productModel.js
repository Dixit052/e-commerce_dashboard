const mongoose  = require('mongoose');

const productSchema = new mongoose.Schema({
        name: String,
        category: String,
        price: Number,
        company: String,
        userId: String
})

const product  = mongoose.model("product",productSchema);
module.exports  = product ;