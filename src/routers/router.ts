import * as express from "express"
import * as path from "path"
import AuthController from "../controllers/AuthController"
import AuthMiddelware from "../middlewares/AuthMiddelware"
import upload from "../middlewares/UploadMiddleware"

const router = express.Router()

// Auth
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)

router.use('/uploads', express.static(path.join(__dirname, 'uploads')))

export default router