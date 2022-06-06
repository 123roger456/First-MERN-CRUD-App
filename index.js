require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const FoodModel = require("./Models/Food");
const cors = require("cors");

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB).then(() => {
    console.log("connection success with DB");
    }).catch((err) => {
    console.log("Error in connection with DB "+ err);
    });

app.post("/insert", async (req, res) => {
    const foodName = req.body.name;
    const foodOrigin =  req.body.origin;

    const food = new FoodModel({
        name:foodName,
        origin:foodOrigin
    });

    
    try {
        await food.save();
        res.send("INserted")

    }catch(err){
        console.log(err);
    }
})

app.get("/showAll", async (req, res) => {
    FoodModel.find({}, (err, found) => {
        if (err){
            res.send(err);
        }
        res.send(found);
    })
})

app.put("/udpate", (req, res) =>{
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try {
        FoodModel.findByIdAndUpdate(id, {name:newFoodName}, (err, res) => {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated")
            }
        })

    }catch(err){
        console.log(err);
    }    
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec();
    console.log("Deleted")
})

if (process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})