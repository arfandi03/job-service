import db from "../models/index.mjs"

const Role = db.Role
const Op = db.Sequelize.Op;

const ROLES = ["admin"];

const createRole = async (body) => await Role.create(body)

const checkRole = async (roles) => {
    roles.forEach(role => {
        if (!ROLES.includes(role)) {
            res.status(400).send({ message: "Failed! Role does not exist = " + role });
            return;
        }
    })
    // let results = await Role.findAll({ where: { name: roles } });
    let result = await getAllRoleByName(roles);
    return result.count ? true : false
}

const getAllRoleByName = async (values) => {
    return await Role.findAll({ where: { name: { [Op.or]: values } } })
}

export { createRole, checkRole, getAllRoleByName }