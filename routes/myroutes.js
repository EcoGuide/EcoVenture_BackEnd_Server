import express from "express";
import guideController from "../controller/guideController.js";
import hotelController from "../controller/hotelController.js";
import chambreController from "../controller/chambreController.js";
import houseController from "../controller/houseController.js";
import reservationHouseController from "../controller/reservationHouseController.js";
import reservationHController from "../controller/reservationHController.js";
import { singleImage } from "../Midlleware/multer-config.js";

const router = express.Router();

router.post('/guide/add', singleImage, guideController.createGuide);
router.get("/guide/:id", guideController.fetchGuide);
router.get("/guides", guideController.fetchAllGuides);
router.delete("/guide/:id", guideController.deleteGuide);

router.get('/guides/:id/reservations', guideController.fetchGuideReservations);
router.post('/guides/:id/reservations', guideController.addGuideReservation);

//Achref:
//hotel
router.post('/hotel/add', singleImage, hotelController.createHotel);
router.get("/hotel/:id", hotelController.fetchHotel);
router.get("/hotels", hotelController.fetchAllHotels);
//chambre
router.post('/chambre/add', singleImage, chambreController.createChambre);
router.get("/chambre/:id", chambreController.fetchChambre);
router.get("/chambres", chambreController.fetchAllChambres);
//house
router.post('/house/add', houseController.createHouse);
router.get('/house/:id', houseController.fetchHouse);
router.get('/houses', houseController.fetchAllHouses);
//reservation Chambre
router.post('/reservationH/:id/add', reservationHController.createreservation);
router.get('/reservationH/:id', reservationHController.getReservationById);
router.get('/reservationHs', reservationHController.getAllReservations);
router.get('/reservationHs/:id', reservationHController.fetchChambreReservations);
//reservation House
router.post('/reservationHouse/:id/add', reservationHouseController.createreservationHouse);
router.get('/reservationHouse/:id', reservationHouseController.getreservationHouseById);
router.get('/reservationHouse', reservationHouseController.getAllreservationHouse);
router.get('/reservationHouses/:id', reservationHouseController.fetchHouseReservations);

export default router;