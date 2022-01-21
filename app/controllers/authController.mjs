import "dotenv/config";
import * as userService from "../services/userService.mjs"
import * as roleService from "../services/roleService.mjs"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    try{
        // Save User to Database
        req.body.password = bcrypt.hashSync(req.body.password, 8);
        let user = await userService.createUser(req.body);
    
        if (req.body.roles) {
            let roles = await roleService.getAllRoleByName(req.body.roles);
            user.setRoles(roles);
            res.send({ message: "User was registered successfully!" });
        }
    }
    catch(err){
        res.status(500).send({ message: err.message });
    };
}

const login = async (req, res) => {
    try{
        let user = await userService.getUserBy({ username: req.body.username });
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
    
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    
        if (!passwordIsValid) return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
    
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
            expiresIn: 86400 // 24 hours
        });
    
        let authorities = [];
        const ROLES = await user.getRoles();
        ROLES.forEach(role => {
            authorities.push("ROLE_" + role.name.toUpperCase());
        });
    
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    }
    catch(err) {
      res.status(500).send({ message: err.message });
    }
}

export { register, login }