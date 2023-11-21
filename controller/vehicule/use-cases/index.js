const db = require('../../../model')
const makeCreateVehicule = require('./createVehicule')
const makeGetVehicule = require('./getVehicule')
const makeGetVehicules = require('./getVehicules')
let E = null,
	utils = null,
    usecases;
function init() {
    const createVehicule = makeCreateVehicule(db,E,utils)
    const getVehicule = makeGetVehicule(db,E,utils)
    const getVehicules = makeGetVehicules(db,E,utils)
    usecases = Object.freeze({
        createVehicule,
        getVehicules,
        getVehicule,
    })
}


module.exports = function (U,errors) {
    utils = U;
	E = errors;
    init()
    return usecases
}
