const express = require("express")
const carsController = require("../controllers/carsController")

const router = express.Router()

router.param("id", carsController.checkId)

router
    .route("/")
    .get(carsController.pingMessage)
    .post(carsController.createCar)

router
    .route("/cars")
    .get(carsController.getAllCars)

router
    .route("/:id")
    .get(carsController.getCarById)
    .put(carsController.editCar)
    .delete(carsController.removeCar)

module.exports = router
