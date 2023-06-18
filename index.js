import "dotenv/config";
import express from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import * as paypal from "./common-api-handlers.js";
import Order from "./models/Order.js";

const app = express();
app.use(express.json());

app.post("/api/orders", async (req, res) => {
    const uuid = crypto.randomUUID();
    const accessToken = await paypal.generateAccessToken();
    console.log(accessToken);
    console.log(req.body);
    const payload = await paypal.buildPayload(req.body.currency, req.body.amount);
    fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'PayPal-Request-Id': uuid,
        'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify(payload)
    }).then((response) => response.json())
      .then((data) => {
          const orderData = new Order();
          orderData.currency = req.body.currency;
          const dataToSave = orderData.save();
          res.status(200).json(dataToSave)
      })
      .catch((error) => {
          console.error(error);
      });
});

app.listen(3000, () => {
    console.log('Server Started @ port 3000')
})
