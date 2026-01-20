const router = require('express').Router();

router.get("/", (req, res) => { 
    //swagger.tags=['Hello World']
    res.send("hello world");
});

//swagger
router.use('/', require('./swagger'))

//API
router.use("/contacts", require("./contacts"));

module.exports = router;