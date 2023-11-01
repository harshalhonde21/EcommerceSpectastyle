import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import router from "./Routes/user-routes.js";
import routers from "./Routes/product-routes.js";
import routerss from "./Routes/dashboard-routes.js";
import routersss from "./Routes/dashboardagent-routes.js";
import routerAddress from "./Routes/user-address-routes.js";
import config from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/ecommerce/user", router);
app.use("/ecommerce/product", routers);
app.use("/ecommerce/manager", routerss);
app.use("/ecommerce/agent", routersss);
app.use("/ecommerce/user-address", routerAddress);


const mongoURI = "mongodb+srv://harshalhonde17:harshal%40123@cluster0.b0mwyen.mongodb.net/Blogs?retryWrites=true&w=majority";


mongoose
  .connect(mongoURI)
  .then(() => app.listen(5500))
  .then(() => console.log("connected to db at port 5500 :)"))
  .catch((err) => console.log(`${err} is error`));
