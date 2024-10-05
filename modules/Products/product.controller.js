const ProductRouter = require("express").Router();
const Product = require("./product.model");
const { Types } = require("mongoose");
const { TokenChecker } = require("../../Middleware/verify.Token");

// 1. Create a Product
// http://localhost:3001/products/create/
ProductRouter.post("/create", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save(); // Changed from product.create() to newProduct.save()
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating product",
      error,
    });
  }
});

// 2. Get all products
// http://localhost:3001/products/
ProductRouter.get("/", TokenChecker, async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      return res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } else {
      return res.status(200).json({
        message: "No products found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching products",
      error,
    });
  }
});

// 3. Get a product by ID
// http://localhost:3001/products/:productId
ProductRouter.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId); // Simplified fetching by ID
    if (product) {
      return res.status(200).json({
        message: "Product fetched successfully",
        product,
      });
    } else {
      return res.status(404).json({
        message: "No product found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching product",
      error,
    });
  }
});

// 4. Get products of a particular brand
// http://localhost:3001/products/subbrand/:SubbrandId
ProductRouter.get("/subbrand/:SubbrandId", async (req, res) => {
  try {
    const { brandId } = req.params;
    const products = await Product.find({ brand: new Types.ObjectId(brandId) });
    if (products.length > 0) {
      return res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } else {
      return res.status(404).json({
        message: "No products found for this brand",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching products",
      error,
    });
  }
});

// 5. Update a product
// http://localhost:3001/products/:productId
ProductRouter.patch("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true, runValidators: true } // Added runValidators for validation on updates
    );
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Failed updating product! Product not found.",
      });
    }
    return res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating product",
      error,
    });
  }
});

// 6. Delete a product
// http://localhost:3001/products/:productId
ProductRouter.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Failed deleting product! Product not found.",
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting product",
      error,
    });
  }
});

module.exports = ProductRouter;
