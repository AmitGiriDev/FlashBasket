import {
  ACESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../../config/config.ts";
import { Customer, Customer, DeliveryPartner } from "../../models/user.ts";

import jwt from "jsonwebtoken";
import { userTypeConstant } from "../../types/index.ts";

const generateToken = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    ACESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  const refreshToken = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return { accessToken, refreshToken };
};

export const loginCustomer = async (req, res) => {
  try {
    const { phone } = req?.body;
    let customer = await Customer.findOne({ phone: phone });
    if (!customer) {
      customer = new Customer({
        phone,
        role: userTypeConstant.Customer,
      });

      await customer.save();
    }

    const { accessToken, refreshToken } = generateToken(customer);
    return res.send({
      message: customer ? "logged in" : "created and logged in",
      accessToken,
      refreshToken,
      customer,
    });
  } catch (error) {
    return res.status(500).send({
      message: "error",
      error,
    });
  }
};

export const loginDeliveryPartner = async (req, res) => {
  try {
    const { email, password } = req?.body;
    let deliveryPartner = await DeliveryPartner.findOne({ email: email });

    if (!deliveryPartner) {
      return res.status(404).send({
        message: "not found",
        deliveryPartner,
        body: req?.body,
      });
    }
    if (password !== deliveryPartner?.password) {
      return res.status(400).send({
        message: "wrong password",
      });
    }

    const { accessToken, refreshToken } = generateToken(deliveryPartner);
    return res.send({
      message: "logged in",
      accessToken,
      refreshToken,
      deliveryPartner,
    });
  } catch (error) {
    return res.status(500).send({
      message: "error",
      error,
    });
  }
};

export const genRefreshToken = async (req, res) => {
  const { refreshToken } = req?.body;
  if (!refreshToken) {
    res?.status(401).send({
      message: "refresh token required",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    let user;
    if (decoded?.role === userTypeConstant.Customer) {
      user = await Customer.findById(decoded.userId);
    } else if (decoded?.role === userTypeConstant.DeliveryPartner) {
      user = await DeliveryPartner.findById(decoded.userId);
    } else {
      res?.status(403).send({
        message: "Invalid role",
      });
    }

    if (!user) {
      res?.send(403).send({
        message: "Invalid refresh token",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken(user);
    return res?.send({
      message: "Token refreshed",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    res?.status(403).send({
      message: "Invalid refresh token",
    });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const { userId, role } = req.user;

    let user;
    if (role === userTypeConstant.Customer) {
      user = await Customer.findById(userId);
    } else if (role === userTypeConstant.DeliveryPartner) {
      user = await DeliveryPartner.findById(userId);
    } else {
      return res?.status(404).send({
        message: "Invalid role",
      });
    }

    if (!user) {
      return res?.status(403).send({
        message: "user not found",
      });
    }

    return res?.send({
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    return res?.status(500).send({
      message: "error occured",
      error,
    });
  }
};
