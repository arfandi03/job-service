import express from "express"
import * as authController from "../controllers/authController.mjs"
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middleware/verifySignUp.mjs";

let router = express.Router()

let authRoute = (app) => {
    router.post("/register", [
        checkDuplicateUsernameOrEmail,
        checkRolesExisted
    ], authController.register)

    router.post("/login", authController.login)

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.use("/api/auth", router)
};

export default authRoute