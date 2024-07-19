import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req?.header("Authorization")?.replace("Bearer ", "") || req.cookies?.accessToken;

        if (!token) {
            return res
                .status(401)
                .json(new ApiResponse(401, {}, "Access token not found"));
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            return res
                .status(404)
                .json(new ApiResponse(404, {}, "User not found"));
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json(new ApiResponse(401, {}, "Invalid token"));
    }
});
