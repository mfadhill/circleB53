import * as express from "express"
import * as path from "path"
import AuthController from "../controllers/AuthController"
import AuthMiddelware from "../middlewares/AuthMiddelware"
import upload from "../middlewares/UploadMiddleware"
import UserController from "../controllers/UserController"
import ThreadController from "../controllers/ThreadController"
import FollowController from "../controllers/FollowController"
import LikeController from "../controllers/LikeController"
import ReplyController from "../controllers/ReplyController"


const router = express.Router()

// Auth
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", AuthMiddelware.Auth, AuthController.logout)
router.post("/check", AuthMiddelware.Auth, AuthController.check)

// Follow
router.post('/follow/:followingId', AuthMiddelware.Auth, FollowController.follow)

// Like
router.post('/thread/:threadId/like', AuthMiddelware.Auth, LikeController.like)

// Reply
router.post("/addreply/:threadId/reply", AuthMiddelware.Auth, upload.single('image'), ReplyController.addReply)
router.post("/updatereply/:threadId/reply/:replyId", AuthMiddelware.Auth, upload.single('image'), ReplyController.updateReply)
router.delete('/deletereply/:replyId', AuthMiddelware.Auth, ReplyController.deleteReply)

// Thread
router.get('/findallthread/:page', AuthMiddelware.Auth, ThreadController.findAll)
router.get('/findthreadbyid/:page', AuthMiddelware.Auth, ThreadController.findByID)
router.post("/addthread/:threadId", AuthMiddelware.Auth, upload.single('image'), ThreadController.addThread)
router.post("/updatethread/:threadId", AuthMiddelware.Auth, upload.single('image'), ThreadController.updateThread)
router.delete('/deletethread/:threadId', AuthMiddelware.Auth, ThreadController.deleteThread)

// Thread Redis
router.get('/threadredis/:page', AuthMiddelware.Auth, ThreadController.findAllRedis)

// User
router.get('/findUser', AuthMiddelware.Auth, UserController.findAll)
router.get('/finduserbyid/:userId', AuthMiddelware.Auth, UserController.findByID)
router.get('/finduserbyname/:name', AuthMiddelware.Auth, UserController.findByName)
router.get('/userptofilenoimage/:userId', AuthMiddelware.Auth, UserController.updateWithoutImage)
router.get('/userprofilewuthimage/:userId', AuthMiddelware.Auth, upload.single('image'), UserController.uploadProfilePicture)
router.delete('/deleteUser/:userId', AuthMiddelware.Auth, UserController.delete)


router.use('/uploads', express.static(path.join(__dirname, 'uploads')))

export default router