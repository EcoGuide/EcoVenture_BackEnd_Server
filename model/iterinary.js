const mongoose = require('mongoose');

const iterinaryScheme = new mongoose.Schema({
    reference : String,
    leaveTime : Date,
    arriveTime : Date,
    vehicule : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Vehicule'
    },
    fromStation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Station'
    },
    toStation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Station'
    },
    iterinaryExpeditions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'IterinaryExpedition'
    }]
});

const Iterinary = mongoose.model('Iterinary', iterinaryScheme);

module.exports = Iterinary;