const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.port || 3000;

const cars = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/cars.json`, 'utf-8'));

app.get("/", (req, res) => {
    res.json({
        message:'ping successfully'
    });
});

app.get('/cars', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            cars
        }
    })
})

app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find(el => el.id === id)

    if(!car) {
        return res.status(404).json({
            status: 'success',
            message: `data with this id : ${id} not found`
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            car
        }
    })
})

app.post('/cars', (req, res) => {
    // generate id untuk data baru dari request api kita
    const newId = req.body.id;
    const newData = Object.assign({id: newId}, req.body);

    cars.push(newData);
    fs.writeFile(`${__dirname}/dev-data/data/cars.json`, JSON.stringify(cars), err => {
        // 201 = CREATED
        res.status(201).json({
            status: 'success',
            data: {
                car: newData
            }
        })
    })
})

app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const carIndex = cars.findIndex(el => el.id === id)

    if(carIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: `data with this id : ${id} not found`
        })
    }

    cars[carIndex] = {...cars[carIndex], ...req.body}

    fs.writeFile(`${__dirname}/dev-data/data/cars.json`, JSON.stringify(cars), err => {
        res.status(200).json({
            status: 'success',
            message: `car with this id : ${id} edited`,
            data: {
                car: cars[carIndex]
            }
        })
    })
})

app.delete('/cars/:id', (req, res) => {
    // konversi string jadi number
    const id = req.params.id;

    // cari index dari data yang sesuai id di re.params
    const carIndex = cars.findIndex(el => el.id === id);

    // validasi kalau data yang sesuai req.params.id nya gak ada
    if (carIndex === -1) {
        return res.status(404).json({
            status: 'failed',
            message: `data with this id : ${id} not found`
        })
    }

    // proses menghapus data sesuai index array nya => req.params.id
    cars.splice(carIndex, 1);

    // proses update di file json nya
    fs.writeFile(`${__dirname}/dev-data/data/cars.json`, JSON.stringify(cars), err => {
        res.status(200).json({
            status: 'success',
            message: `car with this id : ${id} deleted`,
            data: null
        })
    })
})


app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})