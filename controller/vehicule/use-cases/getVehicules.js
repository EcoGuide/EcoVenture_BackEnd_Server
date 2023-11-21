module.exports = function makeGetVehicules(db, E, utils) {
    return async function getVehicules(req, res) {
        const result = await db.Vehicule
        .find({})
        .populate('driver')
        for(rs of result) {
            rs.driver.password = undefined
        }
        res.json(result)
    }
}