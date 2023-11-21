import mongoose from "mongoose";
const { Schema, model } = mongoose;

const expeditionScheme = new Schema({
    reference: String,
    duration: Number,
    fromStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    toStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station'
    },
    iterinaryExpeditions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IterinaryExpedition'
    }]
});

const Expedition = mongoose.model('Expedition', expeditionScheme);

export { Expedition };