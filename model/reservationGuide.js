import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reservationGuideSchema = new Schema(
  {
    guideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    hoursBooked: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ReservationGuide = model("ReservationGuide", reservationGuideSchema);
export { ReservationGuide };
