import {Router} from "express"
import User from "../models/User.js"
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
router.post("/login", (req,res) => {
    console.log(req.body);
    res.redirect("/")
})
// post register
router.post("/register", async (req,res) => {
    try {
        const userData = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            password: req.body.password
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
