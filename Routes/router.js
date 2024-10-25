const express = require("express");
const router = express.Router();
const products = require("../Models/Products");

//Inserting(Creating) Data:
router.post("/insertproduct", async (req, res) => {
  const { ProductName, ProductPrice, ProductBarcode, Stock } = req.body;

  try {
    const pre = await products.findOne({ ProductBarcode: ProductBarcode });
    console.log(pre);

    if (pre) {
      res.status(422).json("Product is already added.");
    } else {
      const addProduct = new products({
        ProductName,
        ProductPrice,
        ProductBarcode,
        Stock,
      });

      await addProduct.save();
      res.status(201).json(addProduct);
      console.log(addProduct);
    }
  } catch (err) {
    console.log(err);
  }
});

//Getting(Reading) Data:
router.get("/products", async (req, res) => {
  try {
    const getProducts = await products.find({});
    console.log(getProducts);
    res.status(201).json(getProducts);
  } catch (err) {
    console.log(err);
  }
});

//Getting(Reading) individual Data:
router.get("/products/:id", async (req, res) => {
  try {
    const getProduct = await products.findById(req.params.id);
    console.log(getProduct);
    res.status(201).json(getProduct);
  } catch (err) {
    console.log(err);
  }
});

//Editing(Updating) Data:
router.put("/updateproduct/:id", async (req, res) => {
  const { ProductName, ProductPrice, ProductBarcode, Stock } = req.body;

  try {
    const updateProducts = await products.findByIdAndUpdate(
      req.params.id,
      { ProductName, ProductPrice, ProductBarcode, Stock },
      { new: true }
    );
    console.log("Data Updated");
    res.status(201).json(updateProducts);
  } catch (err) {
    console.log(err);
  }
});

//Deleting Data:
router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const deleteProduct = await products.findByIdAndDelete(req.params.id);
    console.log("Data Deleted");
    res.status(201).json({
      message: "Products deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

//stock updating

// router.put('/updatestock/:id', async (req, res) => {
//     const { quantity } = req.body; // Quantity to increase or decrease stock

//     try {
//         // Find the product by ID
//         const product = await products.findById(req.params.id);

//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // Update stock and ensure it does not go below zero
//         product.Stock = Math.max(0, product.Stock + quantity);

//         // Save the updated product
//         await product.save();

//         res.status(200).json({ message: "Stock updated successfully", product });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: "Server error" });
//     }
// });

module.exports = router;
