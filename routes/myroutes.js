import express from "express";
import guideController from "../controller/guideController.js";
import { singleImage } from "../Midlleware/multer-config.js";

const router = express.Router();

router.post('/guide/add', singleImage, guideController.createGuide);
router.get("/guide/:id", guideController.fetchGuide);
router.get("/guides", guideController.fetchAllGuides);
router.delete("/guide/:id", guideController.deleteGuide);

router.get('/guides/:id/reservations', guideController.fetchGuideReservations);
router.post('/guides/:id/reservations', guideController.addGuideReservation);
export default router;