import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

const addFood = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    price: req.body.price,
    image: image_filename,
    description: req.body.description,
    category: req.body.category,
  });
  
  try {
    await food.save();
    console.log(food);
    res.json({ success: true, message: "food Added" });
  } catch (error) {
    console.log("Error");
    res.json({ success: false, message: "Error" });
  }
};

// add food list
const listfood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removefood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};



export { addFood, listfood, removefood };
