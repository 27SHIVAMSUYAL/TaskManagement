const express = require("express")
const router = express.Router()

const routes = [
    {
        path:'/auth',
        route:require("./authRoutes")
    },
    {
        path:'/task',
        route:require("./taskRoutes")
    }
]


routes.forEach((C)=>{
    router.use(C.path,C.route)
})

module.exports = router