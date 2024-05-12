import UserAddress from "../Models/UserAddress.js";
import User from "../Models/User.js";
import { z } from 'zod';

const addressSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  pincode: z.string().min(1, 'Pincode is required').refine((value) => parseInt(value) >= 0, {
    message: 'Pincode cannot be a negative number',
  }),
  phoneNumber: z.string().min(1, 'Phone number is required').regex(/^[0-9]{1,10}$/, 'Phone number should not be more than 10 digits'),
  country: z.string().min(1, 'Country is required'),
  state: z.string().min(1, 'State is required'),
});

export const addUserAddress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddressData = addressSchema.parse(req.body);
    const newAddress = new UserAddress(newAddressData);

    await newAddress.save();

    userData.addresses.push(newAddress);

    await userData.save();

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateAddressSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().min(1, 'Pincode is required').refine((value) => parseInt(value) >= 0, {
    message: 'Pincode cannot be a negative number',
  }).optional(),
  phoneNumber: z.string().min(1, 'Phone number is required').regex(/^[0-9]{1,10}$/, 'Phone number should not be more than 10 digits').optional(),
  country: z.string().optional(),
  state: z.string().optional(),
});

export const updateUserAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    const updatedAddressData = updateAddressSchema.parse(req.body);

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressToUpdate = await UserAddress.findById(addressId);

    if (!addressToUpdate) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(addressToUpdate, updatedAddressData);
    await addressToUpdate.save();

    res.status(200).json(addressToUpdate);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the index of the address in the user's addresses
    const addressIndex = user.addresses.findIndex(address => address._id.toString() === addressId);

    if (addressIndex === -1) {
      return res.status(404).json({ error: "Address not found in the user's addresses" });
    }

    // Remove the address from the addresses array
    user.addresses.splice(addressIndex, 1);

    await user.save();

    res.json({ message: "Address removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to remove the address" });
  }
};




export const getUserAddresses = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const userAddresses = await UserAddress.find({
      _id: { $in: userData.addresses },
    });

    res.status(200).json(userAddresses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
