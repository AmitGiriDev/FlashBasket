import mongoose from "mongoose";
import { MONGO_URI } from "./src/config/config.ts";
import Product from "./src/models/products.ts";
import Category from "./src/models/category.ts";
import { categories, products } from "./seedData.ts";

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();
    await Category.deleteMany();

    const CategoryDocs = await Category.insertMany(categories);
    console.log("CategoryDocs", CategoryDocs);

    const categoryMap = CategoryDocs.reduce((map, category) => {
      map[category.name] = category?._id;
      return map;
    }, {});

    console.log("categoryMap", categoryMap);

    const productWithCategoriesId = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.insertMany(productWithCategoriesId);
    console.log("DataBase seeded successfully😁✅");
  } catch (error) {
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
