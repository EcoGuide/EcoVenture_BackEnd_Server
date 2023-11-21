const mongoose = require('mongoose')

const vehiculeScheme = new mongoose.Schema({
    type: String,
    matricule: String,
    name: String,
    driver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
}, {
    timestamps : true
})

const Vehicule = mongoose.model('Vehicule', vehiculeScheme)

module.exports = Vehicule
