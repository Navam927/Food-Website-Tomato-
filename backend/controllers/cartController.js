import userModel from "../models/userModel.js";

// Add item into the cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "unable to add item to cart" });
    }
};

// Remove item from the cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From cart" });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "unable to remove item from cart"});
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    let userdata = await userModel.findById(req.body.userId);
    let cartData = await userdata.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
