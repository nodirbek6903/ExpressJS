import {Router} from "express"
const router = Router()

router.get("/login",(req,res) => {
    res.render("login", {
        title: "Login | Nodirbek",
        isLogin:true
    })
})
router.get("/register",(req,res) => {
    res.render("register", {
        title: "Register | Nodirbek",
        isRegister:true
    })
})

export default router
