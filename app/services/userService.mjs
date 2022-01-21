import db from "../models/index.mjs"

const User = db.User

const createUser = async (body) => await User.create(body)

const getUserBy = async (where) => {
    return await User.findOne({ where: where })
}

export { createUser, getUserBy }