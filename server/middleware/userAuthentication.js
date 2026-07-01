import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import UserModel from "../models/userSchema.js";

const userAuthentication = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized User",
            });
        }

        const token = authorization.split(" ")[1];

        if (!token || token === "null" || token === "undefined") {
            return res.status(401).json({
                status: false,
                message: "Authorization Failed",
            });
        }

        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!Types.ObjectId.isValid(userId)) {
            return res.status(401).json({
                status: false,
                message: "Invalid User ID",
            });
        }

        const user = await UserModel.findById(userId).select("-password");

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "User not found",
            });
        }

        if (user.role !== "user") {
            return res.status(403).json({
                status: false,
                message: "Invalid Request",
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);

        return res.status(401).json({
            status: false,
            message: error.message,
        });
    }
};

export default userAuthentication;
