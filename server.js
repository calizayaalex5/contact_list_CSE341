//crea el servidor
const express = require("express");
const app = express();

//crea el puerto
const port = process.env.PORT || 3000;

//indica la ruta
app.use("/", require("./routes"))

app.listen(port, () => {console.log(`Running on ${port}`)})
