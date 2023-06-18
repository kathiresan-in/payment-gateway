import "dotenv/config";
import express from "express";
import crypto from "crypto";
import * as paypal from "./common-api-handlers.js";

const app = express();

app.post("/api/orders", async (req, res) => {
    const uuid = crypto.randomUUID();
    const accessToken = await paypal.generateAccessToken();
    console.log(accessToken);
    console.log(uuid);
    const payload = await paypal.buildPayload("USD", "120");
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
          console.log(data.id);
      })
      .catch((error) => {
          console.error(error);
      });
});

app.listen(3000, () => {
    console.log('Server Started')
})
