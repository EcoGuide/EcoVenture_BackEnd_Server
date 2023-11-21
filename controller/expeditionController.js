import { Expedition } from "../model/expedition.js";


export default {

    getExpeditions: async (req, res) => {
        try {
            const result = await Expedition
                .find(req.query.from || req.query.to
                    ? { $or: [{ fromStation: req.query.from }, { toStation: req.query.to }] }
                    : {}
                )
                .populate('fromStation')
                .populate('toStation')
            return res.json(result)
        }

        catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    },

    createExpedition: async (req, res) => {
        try {
            const expedition = new Expedition({
                reference: req.body.reference,
                fromStation: req.body.fromStationId,
                toStation: req.body.toStationId,
                duration: req.body.duration,
            })
            const result = await expedition.save()
            return res.json(result)
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }


    },

    getExpedition: async (req, res) => {
        try {
            const result = await Expedition
                .findById(req.params.id)
                .populate('fromStation')
                .populate('toStation')
            res.json(result)
        }

        catch (error) {
            console.error(error);
            return res.status(500).json({
                statusCode: 500,
                message: "Internal server error",
            });
        }
    }
}
