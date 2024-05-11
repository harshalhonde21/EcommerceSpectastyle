import express from "express";
import mongoose from "mongoose";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import router from "./Routes/user-routes.js";
import routers from "./Routes/product-routes.js";
import routerss from "./Routes/dashboard-routes.js";
import routersss from "./Routes/dashboardagent-routes.js";
import routerAddress from "./Routes/user-address-routes.js";
import visitCountRoutes from "./Routes/visit-count-routes.js";

const app = express();
const stripe = new Stripe(
  "sk_test_51O96wfSH8i1UqUchc81vmn8Mka2bbbMrCW2vZKLEvGRTZDqWx2KlxkbLzdQnAJ0ipNA1UtO9Y83vX4x7KXjz5E4Z00JxrbAflY"
);

app.use(cors());
app.use(express.json());
app.use("/ecommerce/user", router);
app.use("/ecommerce/product", routers);
app.use("/ecommerce/manager", routerss);
app.use("/ecommerce/agent", routersss);
app.use("/ecommerce/user-address", routerAddress);
app.use("/visitcount", visitCountRoutes); // added newly

app.post("/checkout", async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid or empty item data" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Product Name",
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: "https://spectastyle.vercel.app/success",
      cancel_url: "https://spectastyle.vercel.app/cancel",
    });

    if (!session || !session.id) {
      return res
        .status(500)
        .json({ error: "Failed to create a checkout session" });
    }

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 4000;
const url = process.env.MONGO_URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(port))
  .then(() => console.log(`connected to db at port ${port} :)`))
  .catch((err) => console.log(`${err} is error`));

// updated with the ports
