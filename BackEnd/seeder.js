import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";
import fetch from "node-fetch";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Fetch the product data from the API
    const response = await fetch('https://react-tutorial-demo.firebaseio.com/productinfo.json');
    const data = await response.json();

    // Convert the fetched data to an array of products
    const products = Object.values(data).map(product => ({
      price_id: product.price_id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      nutrition: {
        carbs: product.nutrition.carbs,
        fat: product.nutrition.fat,
        protein: product.nutrition.protein,
        salt: product.nutrition.salt,
      },
      storage: product.storage
    }));

    // Log the mapped products to check the structure
    console.log(products);

    // Delete existing products in the database
    await Product.deleteMany();

    // Insert the new products into the database
    await Product.insertMany(products);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
