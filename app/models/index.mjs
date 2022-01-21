"use strict";

import fs from "fs";
import Sequelize from "sequelize";
const env = process.env.NODE_ENV || "development";

import userModel from "./user.mjs"
import roleModel from "./role.mjs"

const config = JSON.parse(fs.readFileSync('app/config/config.json', 'utf8'))[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

db.User = userModel(sequelize, Sequelize.DataTypes)
db.Role = roleModel(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
