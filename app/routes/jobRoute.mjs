
import * as jobController from "../controllers/jobController.mjs"
import * as authJwt from "../middleware/authJwt.mjs";
import express from "express"

let router = express.Router()

let userRoute = (app) => {
    // router.get("/user", [authJwt.verifyToken], userController.userBoard);
    
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], jobController.listJob);
    router.get("/jobs/:id", [authJwt.verifyToken, authJwt.isAdmin], jobController.showJob);

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.use("/api/jobs", router)
};

export default userRoute;