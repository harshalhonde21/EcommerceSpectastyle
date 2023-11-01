import express from "express";
import {
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
  getUserAddresses,
} from "../Controller/user-address.js";

const routerAddress = express.Router();

routerAddress.post("/addAddress/:userId", addUserAddress);
routerAddress.put("/updateAddress/:userId/:addressId", updateUserAddress);
routerAddress.delete("/deleteAddress/:userId/:addressId", deleteUserAddress);
routerAddress.get("/getAddresses/:userId", getUserAddresses);

export default routerAddress;
