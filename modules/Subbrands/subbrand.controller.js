const SubBrandRouter = require("express").Router();
const SubBrand = require("./subbrand.model");
const { Types } = require("mongoose");

// 1. Create auth
// http://localhost:3001/subbrands/create/
SubBrandRouter.post("/create", async (req, res) => {
  try {
    const newbrand = new SubBrand(req.body);
    await SubBrand.create(newbrand);
    return res.status(201).json({
      message: "SubBrand created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating Subbrand",
      error,
    });
  }
});

// 2. Get all subbrands
// http://localhost:3001/subbrands/
SubBrandRouter.get("/", async (req, res) => {
  try {
    const response = await SubBrand.find();
    if (response.length > 0) {
      return res.status(200).json({
        message: "SubBrands fetched successfully",
        response,
      });
    } else {
      return res.status(200).json({
        message: "No SubBrands found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error creating brand",
      error,
    });
  }
});

// 3. Get a brand
// http://localhost:3001/subbrands/brand/:brandId
SubBrandRouter.get("/brand/:brandId", async (req, res) => {
  try {
    const { brandId } = req.params;
    const response = await SubBrand.findOne({
      _id: new Types.ObjectId(brandId),
    });
    if (response) {
      return res.status(200).json({
        message: "SubBrand fetched successfully",
        response,
      });
    } else {
      return res.status(200).json({
        message: "No SubBrand found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching brand",
      error,
    });
  }
});

// 3. Update a subbrands
// http://localhost:3001/subbrands/:brandId
SubBrandRouter.patch("/:brandId", async (req, res) => {
  const { brandId } = req.params;
  try {
    const response = await SubBrand.findOneAndUpdate(
      {
        _id: new Types.ObjectId(brandId),
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!response) {
      return res.status(404).json({
        message: "Failed updating brand!",
      });
    }
    if (response) {
      return res.status(200).json({
        message: "SubBrand updated successfully",
        response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error updating brand",
      error,
    });
  }
});

// 3. Update a subbrands
// http://localhost:3001/subbrands/:brandId
SubBrandRouter.delete("/:brandId", async (req, res) => {
  const { brandId } = req.params;
  try {
    const response = await SubBrand.findOneAndDelete({
      _id: new Types.ObjectId(brandId),
    });
    if (!response) {
      return res.status(404).json({
        message: "Failed deleting brand!",
      });
    }
    if (response) {
      return res.status(200).json({
        message: "SubBrand deleted successfully",
        response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error Deleting brand",
      error,
    });
  }
});

module.exports = SubBrandRouter;
