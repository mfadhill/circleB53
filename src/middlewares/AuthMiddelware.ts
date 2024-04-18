import * as jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export default new class AuthMiddleware {
    Auth(req: Request, res: Response, next: NextFunction) {
        try {
            const AuthorZ = req.header('Authorization')

            if (!AuthorZ || !AuthorZ.startsWith("Bearer ")) {
                return res.status(401).json({ Error: "Unauthorization" })
            }

            const token = AuthorZ.split(' ')[1]

            try {
                const loginSession = jwt.verify(token, 'SECRET_KEY')
                res.locals.loginSession = loginSession
                next()
            } catch (error) {
                return res.status(401).json({ message: "Token Failed" })
            }
        } catch (error) {
            return res.status(500).json({ Error: "Error ketika gak ada token" })
        }
    }

    async logout(req: Request, res: Response) {
        try {
            delete res.locals.loginSession

            return res.status(200).json({ message: "Logout Berhasil" })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Gagal melakukan logout" })

        }
    }
}