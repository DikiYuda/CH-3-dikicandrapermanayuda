const fs = require("fs")

const cars = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/cars.json`,
        "utf-8"
    )
)

const checkId = (req, res, next, val) => {
    const car = cars.find((el) => el.id === val)

    if (!car) {
        return res.status(404).json({
            status: "failed",
            message: `data with this id : ${val} not found`,
        })
    }
    next()
}

const pingMessage = (req, res) => {
    res.json({
        message: "ping successfully",
    })
}

const getAllCars = (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            cars,
        },
    })
}

const getCarById = (req, res) => {
    const id = req.params.id
    const car = cars.find((el) => el.id === id)

    res.status(200).json({
        status: "success",
        data: {
            car,
        },
    })
}

const createCar = (req, res) => {
    const newId = req.body.id
    const newData = Object.assign(
        { id: newId },
        req.body
    )

    cars.push(newData)
    fs.writeFile(
        `${__dirname}/../dev-data/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            // 201 = CREATED
            res.status(201).json({
                status: "success",
                data: {
                    car: newData,
                },
            })
        }
    )
}

const editCar = (req, res) => {
    const id = req.params.id
    const carIndex = cars.findIndex(
        (el) => el.id === id
    )

    cars[carIndex] = {
        ...cars[carIndex],
        ...req.body,
    }

    fs.writeFile(
        `${__dirname}/../dev-data/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: "success",
                message: `car with this id : ${id} edited`,
                data: {
                    car: cars[carIndex],
                },
            })
        }
    )
}

const removeCar = (req, res) => {
    const id = req.params.id

    const carIndex = cars.findIndex(
        (el) => el.id === id
    )

    cars.splice(carIndex, 1)

    fs.writeFile(
        `${__dirname}/../dev-data/data/cars.json`,
        JSON.stringify(cars),
        (err) => {
            res.status(200).json({
                status: "success",
                message: `car with this id : ${id} deleted`,
                data: null,
            })
        }
    )
}

module.exports = {
    pingMessage,
    getAllCars,
    getCarById,
    createCar,
    editCar,
    removeCar,
    checkId,
}
