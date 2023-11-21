module.exports = function makeCreateVehicule(db, E, utils) {
    return async function createVehicule(req, res) {
            const vehicule = new db.Vehicule({
                type : req.body.type,
                matricule: req.body.matricule,
                name : req.body.name,
                driver : req.body.driverId
            })
            const result = await vehicule.save()
            res.json(result)
    }
}