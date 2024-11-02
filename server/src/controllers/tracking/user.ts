import { Customer, DeliveryPartner } from "../../models/user.ts";
import { userTypeConstant } from "../../types/index.ts";

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const updateData = req.body;
    let user =
      (await Customer.findById(userId)) ||
      (await DeliveryPartner.findById(userId));
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    let UserModel;
    if (user.role === userTypeConstant.Customer) {
      UserModel = Customer;
    } else if (user.role === userTypeConstant.DeliveryPartner) {
      UserModel = DeliveryPartner;
    } else {
      return res.status(400).send({ message: "Invalid Role" });
    }

    const updatedUser = await UserModel?.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).send({
        message: "user not found",
      });
    }

    return res.send({
      message: "user updated",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      message: "error",
      error,
    });
  }
};
