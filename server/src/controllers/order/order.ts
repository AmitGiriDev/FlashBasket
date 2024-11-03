import { Branch } from "../../models/branch.ts";
import Order from "../../models/order.ts";
import { Customer, DeliveryPartner } from "../../models/user.ts";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { items, branch, totalPrice } = req.body;
    const customerData = await Customer.findById(userId);
    const branchData = await Branch.findById(branch);

    if (!customerData) {
      return res?.status(404).send({
        message: "customer not found",
      });
    }
    const newOrder = new Order({
      customer: userId,
      items: items.map((item) => ({
        id: item.id,
        item: item.item,
        count: item.count,
      })),
      branch: branch,
      totalPrice: totalPrice,
      deliveryLocation: {
        latitude: customerData.liveLocation?.latitude,
        longitude: customerData.liveLocation?.longitude,
        address: customerData.address || "No address available",
      },
      pickupLocation: {
        latitude: branchData?.liveLocation?.latitude,
        longitude: branchData?.liveLocation?.longitude,
        address: branchData?.address || "No address available",
      },
    });
    const savedOrder = await newOrder.save();

    return res?.status(201).send(savedOrder);
  } catch (error) {
    return res?.status(500).send({
      message: "failed to create order",
      error,
    });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderId } = req.params;
    const { deliveryPartnerLocation } = req.body;

    const deliveryPartner = await DeliveryPartner.findById(userId);
    if (!deliveryPartner) {
      return res?.status(404).send({
        message: "deliveryPartner not found",
      });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res?.status(404).send({
        message: "Order not found",
      });
    }

    if (order.status !== "available") {
      return res?.status(400).send({
        message: "order is not available",
      });
    }
    order.status = "confirmed";

    order.deliveryPartner = userId;
    order.deliveryPartnerLocation = {
      latitude: deliveryPartnerLocation.latitude,
      longitude: deliveryPartnerLocation.longitude,
      address: deliveryPartnerLocation.address || "",
    };
    req.server.io.to(orderId).emit("orderConfirmed", order);
    await order.save();
    return res.send(order);
  } catch (error) {
    return res?.status(500).send({
      message: "error occured",
      error,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { userId } = req.user;
    const { orderId } = req.params;
    const { deliveryPartnerLocation, status } = req.body;

    const deliveryPartner = await DeliveryPartner.findById(userId);
    if (!deliveryPartner) {
      return res?.status(404).send({
        message: "deliveryPartner not found",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res?.status(404).send({
        message: "Order not found",
      });
    }

    if (["delivered", "cancelled"].includes(order.status)) {
      return res?.status(400).send({
        message: "order cannot be updated",
      });
    }

    if (order.deliveryPartner.toString() !== userId) {
      return res?.status(403).send({
        message: "unauthorized",
      });
    }

    order.status = status;
    await order.save();
    req.server.io.to(orderId).emit("liveTrackingUpdates", order);

    return res.send(order);
  } catch (error) {
    return res?.status(500).send({
      message: "error occured",
      error,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate(
      "customer branch items.item deliveryPartner"
    );
    if (!order) {
      return res?.status(404).send({
        message: "not found order",
      });
    }
    return res.send(order);
  } catch (error) {
    return res?.status(500).send({
      message: "error occured",
      error,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { status, customerId, deliveryPartnerId, branchId } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }
    if (customerId) {
      query.customer = customerId;
    }
    if (deliveryPartnerId) {
      query.deliveryPartner = deliveryPartnerId;
      query.branch = branchId;
    }
    const orders = await Order.find(query).populate(
      "customer branch items.item deliveryPartner"
    );

    return res.send(orders);
  } catch (error) {
    return res?.status(500).send({
      message: "error occured",
      error,
    });
  }
};
