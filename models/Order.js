import mongoose from "mongoose";

const Order = new mongoose.Schema(
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
)

export default Order