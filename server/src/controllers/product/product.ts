import Product from "../../models/products.ts";

export const getProductsByCategories = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.find({ category: categoryId })
      .select("-category")
      .exec();

    return res.send(products);
  } catch (error) {
    return res?.status(500).send({
      message: "error occured",
      error,
    });
  }
};
