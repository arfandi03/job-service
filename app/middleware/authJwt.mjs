import jwt from "jsonwebtoken";
import "dotenv/config";
import * as userService from "../services/userService.mjs"


const verifyToken = (req, res, next) => {
    // let token = req.headers["x-access-token"];

    let token = req.headers.authorization;
    
    if (!token || token.slice(0,6) !== "Bearer") return res.status(403).send({ message: "No token provided!" });
    
    token = token.split(" ");

    token = token[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    let user = await userService.getUserBy({ id: req.userId });

    const ROLES = await user.getRoles();

    let isAdmin = false;

    ROLES.forEach(role => {
        if (role.name === "admin") {
            isAdmin = true;
            return;
        }
    });
    
    if(isAdmin) next();

    else res.status(403).send({ message: "Require Admin Role!" });
};

export { verifyToken, isAdmin };