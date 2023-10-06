import {Router} from "express"
import User from "../models/User.js"
import bcrypt from "bcrypt"

const router = Router()
// get login
router.get("/login",(req,res) => {
    res.render("login", {
        title: "Login | Nodirbek",
        isLogin:true,
        loginError: req.flash("loginError"),
    })
})
// get register
router.get("/register",(req,res) => {
    res.render("register", {
        title: "Register | Nodirbek",
        isRegister:true,
        registerError: req.flash("registerError"),
    })
})
// post login
router.post("/login", async(req,res) => {
    const {email,password}  = req.body

    if(!email || !password){
        req.flash("loginError","All fields is required")
        res.redirect("/login")
        return
    }

    const existUser = await User.findOne({email})
    if(!existUser){
        req.flash("loginError","User not found")
        res.redirect("/login")
        return
    }

    const isPasswordEqual = await bcrypt.compare(password,existUser.password)
    if(!isPasswordEqual) {
        req.flash("loginError","Password wrong")
        res.redirect("/login")
        return
    }
    
    console.log(existUser);
    res.redirect("/")
})
// post register
router.post("/register", async (req,res) => {
    const {firstname,lastname,email,password} = req.body
    if(!firstname || !lastname || !email || !password){
        req.flash("registerError","All fields is required")
        res.redirect("/register")
        return
    }

    const candidate = await User.findOne({email})

    if(candidate){
        req.flash("registerError","User already exist")
        res.redirect("/register")
        return
    }

    const hashedPassword = await  bcrypt.hash(password, 10)

    try {
        const userData = {
            firstName: firstname,
            lastName: lastname,
            email: email,
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
