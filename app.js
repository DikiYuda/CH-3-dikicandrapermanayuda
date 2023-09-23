const fs = require("fs")

const express = require("express")
const morgan = require("morgan")

const carRouter = require("./routes/carsRoutes")

const app = express()

app.use(express.json())
app.use(morgan("dev"))

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    console.log(req.requestTime)
    next()
})

app.use("/", carRouter)
app.use("/cars", carRouter)

module.exports = app
