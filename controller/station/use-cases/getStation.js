module.exports = function makeGetStation(db, E, utils) {
    return async function getStation(req, res) {
        const result = await db.Station
        .find({})
        .populate('outExpeditions')
        .populate('inExpeditions')
        .populate('outIterinaries')
        .populate('inIterinaries')

        let fromStation = result[0]
        result.map((station) => {
            if(utils.calculateDistance(station.lan, station.lat, req.query.fromLan, req.query.fromLat) 
            <  utils.calculateDistance(fromStation.lan, fromStation.lat, req.query.fromLan, req.query.fromLat) ) {
                fromStation = station
            }
        })

        let toStation = result[0]
        result.map((station) => {
            if(utils.calculateDistance(station.lan, station.lat, req.query.toLan, req.query.toLat) 
            <  utils.calculateDistance(toStation.lan, toStation.lat, req.query.toLan, req.query.toLat) ) {
                toStation = station
            }
        })
        res.json({fromStation: {
            id: fromStation.id,
            title: fromStation.reference,
            coordinates: {
                lat: fromStation.lat,
                lan: fromStation.lan
            }
        },toStation, message:"success",statusCode:200})
    }
}