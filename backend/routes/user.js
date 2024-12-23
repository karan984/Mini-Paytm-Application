import express from "express"
import jwt from "jsonwebtoken"
import zod, { string } from "zod"
import {User, Account} from "../db.js"
import { JWT_SECRET } from "../config.js"
import {authMiddleware} from "../middleware.js"

export const router = express.Router()

const signupSchema = zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

const signinSchema = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

router.post("/signin", async function(req, res){
    const {success} = signinSchema.safeParse(req.body)

    if(!success){
        console.log(response.error)
        return res.status(411).json({
            message:"Wrong email or password"
        })
    }
    
    const user = await User.findOne({
        username:req.body.username,
    })

    if(!user || user.password != req.body.password){
        return res.status(411).json({
            message:"Error while logging in"
        })
    }

    
        const token = jwt.sign({
            userId:user._id
        }, JWT_SECRET)

        res.json({
            token:token
        })

        return
    
})

router.post("/signup", async function(req, res){
    const {success} = signupSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Email already taken / incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message:"Email already taken / incorrect inputs"
        })
    }

    const user = await User.create({
        username:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    const userId = user._id

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message:"User successfully created",
        token:token
    })
})

const updateBody = zod.object({
    firstName:string().optional(),
    lastName:string().optional(),
    password:string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message:"Error while updating the information"
        })
    }

    await User.updateOne({
        _id:req.userId
    }, {$set : req.body})

    res.json({
        message:"Update successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        }, {
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})
