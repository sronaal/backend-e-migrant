const express = require("express")
const mongoose = require("mongoose")
const routerEmigrante = require('./routes/Emigrante.js')
require("dotenv").config()

const cors = require("cors")
const app = express()
const port = 3000;

app.use(express.json())

let mongo = process.env.MongoDB

app.use(cors())
app.use('/api',routerEmigrante)

mongoose.connect("mongodb+srv://admin:admin123@emigrantcluster.mpa8t.mongodb.net/emigrant?retryWrites=true&w=majority")
.then(() => console.log("DB Activa"))
.catch(console.error());

app.listen(port, () =>{console.log("Sevidor activo " + port)})