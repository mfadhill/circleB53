import express from 'express'
import * as dotenv from 'dotenv'
import router from "./routers/router"

const app = express()
app.use(express.json())
dotenv.config()

app.use("/api/circle/", router)


app.listen(process.env.PORT, () => {
    console.log(`Server running in Port: ${process.env.PORT}`)
})