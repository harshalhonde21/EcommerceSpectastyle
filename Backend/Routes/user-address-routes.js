import express from "express";
import userAddressController from "../controllers/userAddressController.js";

const router = express.Router();

// Add Address
router.post("/users/:userId/addresses", userAddressController.addUserAddress);

// Update Address
router.put("/users/:userId/addresses/:addressId", userAddressController.updateUserAddress);

// Delete Address
router.delete("/users/:userId/addresses/:addressId", userAddressController.deleteAddress);

// Get Addresses
router.get("/users/:userId/addresses", userAddressController.getUserAddresses);

export default router;