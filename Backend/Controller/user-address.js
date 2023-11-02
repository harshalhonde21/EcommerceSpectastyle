import UserAddress from "../Models/UserAddress.js";
import User from "../Models/User.js";

export const addUserAddress = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAddressData = req.body;
    const newAddress = new UserAddress(newAddressData);

    await newAddress.save();

    userData.addresses.push(newAddress);

    await userData.save();

    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    const updatedAddressData = req.body;

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

export const deleteUserAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;

    const userData = await User.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressToDelete = await UserAddress.findById(addressId);

    if (!addressToDelete) {
      return res.status(404).json({ message: "Address not found" });
    }

    await addressToDelete.remove(); 

    userData.addresses = userData.addresses.filter(
      (address) => address._id.toString() !== addressId
    );

    await userData.save();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting the address" });
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
