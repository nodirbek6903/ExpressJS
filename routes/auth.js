import {Router} from "express"
const router = Router()

router.get("/products",(req,res) => {
res.render("products")
})
router.get("/add",(req,res) => {
    res.render("add")
})

export default router
