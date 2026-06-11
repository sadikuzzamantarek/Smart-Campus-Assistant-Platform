// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { responseReturn } from "../utils/response.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return responseReturn(res, false, 401, "Not authorized, no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return responseReturn(res, false, 401, "Invalid or expired token");
  }
};
