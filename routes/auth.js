import {Router} from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"

const router = Router()
// get login
router.get("/login",(req,res) => {
    res.render("login", {
        title: "Login | Nodirbek",
        isLogin:true
    })
})
// get register
router.get("/register",(req,res) => {
    res.render("register", {
        title: "Register | Nodirbek",
        isRegister:true
    })
})
// post login
router.post("/login", async(req,res) => {
    const existUser = await User.findOne({email: req.body.email})
    if(!existUser){
        console.log("User not found")
        return 
    }

    const isPasswordEqual = await bcrypt.compare(req.body.password,existUser.password)
    if(!isPasswordEqual) {
        console.log("Password wrong")
        return 
    }
    
    console.log(existUser);
    res.redirect("/")
})
// post register
router.post("/register", async (req,res) => {
    const hashedPassword = await  bcrypt.hash(req.body.password, 10)

    try {
        const userData = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
        }
        const user = await User.create(userData)
        console.log(user)
        res.redirect("/")
    } catch (error) {
        console.error("Foydalanuvchi yaratishda xatolik:",error);
        res.status(500).send("Foydalanuvchi yaratishda xatolik yuz berdi");
    }
})

export default router
