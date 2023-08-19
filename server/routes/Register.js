const router = require("express").Router()
const {registerHandler, loginHandler}= require("../controller/userHandler.js")
// How to use router from express to make new routes in a external file ? 

// Post route for sening Register Details

router.post('/register', registerHandler);

router.post("/login", loginHandler)




module.exports = router;