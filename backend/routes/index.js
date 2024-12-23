import express from "express"
import {router as userRouter} from "./user.js"
import {router as accountRouter} from "./account.js"

export const router = express.Router();

router.use("/user", userRouter)
router.use("/account", accountRouter)
