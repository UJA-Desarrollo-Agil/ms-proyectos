const express = require("express");
const routes = require("./routes");
const app = express();
const port = 8002;
app.use("/", routes);


app.listen(port, () => {
    console.log(`Microservicio PROYECTOS ejecutándose en puerto ${port}!`);
});


module.exports = app
