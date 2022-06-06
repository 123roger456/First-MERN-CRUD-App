const mongoose = require("mongoose");

const food = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    origin:{
        type: String,
        required: true
    }
});

const FoodModel = mongoose.model("food", food);

module.exports = FoodModel;