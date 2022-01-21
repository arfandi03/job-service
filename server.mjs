import express from"express";
import cors from "cors";
import "dotenv/config";
import db from "./app/models/index.mjs"
import authRoute from "./app/routes/authRoute.mjs"
import jobRoute from "./app/routes/jobRoute.mjs"
import * as roleService from "./app/services/roleService.mjs"


const app = express();

var corsOptions = {
  origin: `http://localhost:${process.env.PORT}`
};

// cors provides Express middleware to enable CORS
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

authRoute(app);
jobRoute(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => { 
  console.log("DB Connected");
  initial();
  // Role.bulkCreate([
  //   {name: "admin"}
  // ], {ignoreDuplicates: true})
});

function initial() {
  if(!roleService.checkRole(["admin"])) Role.create({name: "admin"});
}

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}.`) });