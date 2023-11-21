module.exports = function makeGetVehicule(db, E, utils) {
    return async function getVehicule(req, res) {
        const result = await db.Vehicule
        .findById(req.params.id)
        .populate('driver')

        result.driver.password = undefined
        res.json(result)
    }
}