import * as userService from "../services/userService.mjs"
import * as roleService from "../services/roleService.mjs"

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Username
    let user = await userService.getUserBy({ username: req.body.username });
    
    if (user) {
        res.status(400).send({ message: "Failed! Username is already in use!" });
        return;
    }

    user = await userService.getUserBy({ email: req.body.email });
    if (user) {
        res.status(400).send({  message: "Failed! Email is already in use!" });
        return;
    }

    next();
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        if (!roleService.checkRole(req.body.roles)) {
            res.status(400).send({ message: "Failed! Role does not exist = " + role });
            return;
        }
        next();
        return;
    }
    res.status(400).send({ message: "Undefined roles" });
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };