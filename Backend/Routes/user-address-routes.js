import express from "express";
import {
  addUserAddress,
  updateUserAddress,
  getUserAddresses,
  deleteAddress,
} from "../Controller/user-address.js";

const routerAddress = express.Router();

routerAddress.post("/addAddress/:userId", addUserAddress);
routerAddress.put("/updateAddress/:userId/:addressId", updateUserAddress);
routerAddress.delete("/deleteAddress/:userId/:addressId", deleteAddress);
routerAddress.get("/getAddresses/:userId", getUserAddresses);

export default routerAddress;
