import { Request, Response } from "express"
import AuthService from "../services/AuthService"
import AuthMiddelware from "../middlewares/AuthMiddelware"


export  default new class AuthController {
    register(req: Request, res: Response ) {
        AuthService.register(req,res)
    }
    login(req: Request, res: Response ) {
        AuthService.login(req,res)
    }
    logout(req: Request, res: Response ) {
        AuthMiddelware.logout(req,res)
    }
}