import { model, Schema } from "mongoose";

const OrderSchema = new Schema(
{
    customerFullName: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    creditCard: {
        number: {
            type: String,
            required: true
        },
        expirationMonth: {
            type: String,
            required: true
        },
        expirationYear: {
            type: Number,
            required: true
        },
        ccv: {
            type: String,
            required: true
        }
    },
    paymentReference: {
        type: String
    }
}
);

export const OrderModel = model("OrderModel", OrderSchema);