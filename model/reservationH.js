import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reservationHSchema = new Schema(

    {
        startDate: { type: Date, required: true },
        nbdays: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        chambre: {
            type: Schema.Types.ObjectId,
            ref: "Chambre",
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Assuming you have a User model
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const ReservationH = model('ReservationH', reservationHSchema);

export { ReservationH };