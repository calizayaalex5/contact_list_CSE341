//crea el servidor
const express = require("express");

const mongodb = require("./data/database");
const app = express();


//crea el puerto
const port = process.env.PORT || 3000;

//indica la ruta
app.use("/", require("./routes"))


mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listen and node running on port ${port}`)})
    }
})



