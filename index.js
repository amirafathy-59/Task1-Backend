import express from 'express'
import dotenv from "dotenv"
import morgan from "morgan";
import dbConnection from './DB/DBConnection.js'
import { init } from './src/modules/index.routes.js';

import cors from "cors"
dotenv.config()
const app = express()
const port = 3000
//middleware
app.use(cors())

app.use(express.json())
// app.use(express.static('uploads'))
if (process.env.MODE == 'development') {
    app.use(morgan('dev'))
}



init(app)

dbConnection()
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))

