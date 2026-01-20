//crea el servidor
const express = require("express");

const mongodb = require("./data/database");
const app = express();


const bodyParser = require('body-parser')


//crea el puerto
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requester-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.urlencoded({ extended: true}))

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



