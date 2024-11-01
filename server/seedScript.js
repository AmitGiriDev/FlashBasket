import mongoose from "mongoose";
import { MONGO_URI } from "./src/config/config.js";
import Product from "./src/models/products.js";
import Category from "./src/models/category.js";
import { categories, products } from "./seedData.js";

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();
    await Category.deleteMany();

    const CategoryDocs = await Category.insertMany(categories);
    console.log("CategoryDocs", CategoryDocs);

    const categoryMap = CategoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    console.log("categoryMap", categoryMap);

    const productWithCategoriesId = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    console.log("productWithCategoriesId", productWithCategoriesId);
    await Product.insertMany(productWithCategoriesId);
    console.log("DataBase seeded successfully😁✅");
  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
