import {Router} from "express"
const router = Router()

router.get("/",(req,res) => {
    res.render("index", {
    title:"Boom Shop | Nodirbek",
    token: true,
    })
})
router.get("/products",(req,res) => {
    res.render("products", {
        title: "Products | Nodirbek",
        isProducts: true,
    })
    })

    router.get("/add",(req,res) => {
        res.render("add", {
            title: "Add Products | Nodirbek",
            isAdd: true,
        })
    })


export default router