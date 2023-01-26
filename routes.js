// routes.js - routes for microservicio-1.

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");


/* Directotio para rutas estáticas */
router.use('/', express.static(__dirname + '/static-files'))



// Home page route.
router.get("/", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});

// About page route.
router.get("/about", async (req, res) => {
    try {
        await callbacks.about(req, res)
    } catch (error) {
        console.log(error);
    }
});



// Test de conexión a la base de datos
router.get("/test_db", async (req, res) => {
    try {
        await callbacks.test_db(req, res)
    } catch (error) {
        console.log(error);
    }
});

// Devuelve todos los proyectos que hay en la BBDD
router.get("/getProyectosAll", async (req, res) => {
    try {
        await callbacks.getProyectosAll(req, res)
    } catch (error) {
        console.log(error);
    }
});

// Devuelve todos los proyectos que hay en la BBDD
router.get("/listar", async (req, res) => {
    try {
        await callbacks.listar(req, res)
    } catch (error) {
        console.log(error);
    }
});


// Exporto el módulo para poder usarlo en server
module.exports = router;
