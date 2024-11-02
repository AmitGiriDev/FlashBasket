import jwt from "jsonwebtoken";
import { ACESS_TOKEN_SECRET } from "../config/config.ts";

export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        message: "Access token required",
      });
    }
    const decoded = jwt.verify(token, ACESS_TOKEN_SECRET);
    req.user = decoded;
    return true;
  } catch (error) {
    return res.status(403).send({
      message: "inavlid token or expired",
    });
  }
};
