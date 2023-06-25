import "dotenv/config";
import express from "express";
import crypto from "crypto";
import mongoose from "mongoose";
import * as paypal from "../common-api-handlers.js";
import { OrderModel } from "../models/order.js";
import config from "../config/configurations.js"

const mongoString = process.env.DATABASE_URL;
mongoose.connect(config.mongo.CONNECTION_STRING);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});

const router = express.Router();

router.post("/orders", async (req, res) => {
    const uuid = crypto.randomUUID();
    const accessToken = await paypal.generateAccessToken();
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
          const orderData = new OrderModel({
              customerFullName: req.body.customerFullName,
              currency: req.body.currency,
              amount: req.body.amount,
              creditCard: {
		number: req.body.number,
		expirationMonth: req.body.expirationMonth,
		expirationYear: req.body.expirationYear,
		ccv: req.body.ccv
		},
              paymentReference: data.id
          });
          const dataToSave = orderData.save();
          res.status(200).json(orderData)
      })
      .catch((error) => {
          console.error(error);
      });
});

export default router;
