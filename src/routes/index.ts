import express from "express";
const router = express.Router();

// imports
import userRoute from "../modules/user/user.route";
import authRoute from "../modules/auth/auth.route";

// routes
router.use("/users", userRoute);
router.use("/auth", authRoute);

export default router;
