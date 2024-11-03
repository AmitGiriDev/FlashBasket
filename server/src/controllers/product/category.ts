import Category from "../../models/category.ts";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.send(categories);
  } catch (error) {
    return res?.status(500).send({
      message: "error occured",
      error,
    });
  }
};
