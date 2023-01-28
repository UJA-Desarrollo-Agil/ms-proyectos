// callbacks.js - callbacks for microservicio-1.
// CALLBACKS DEL MODELO
// CALLBACKS DEL MODELO
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAE6dR1GVAA1qiaRxaSZtbA7yGo6OpT2cB5NQnb',
});

const SEND_FILE_OPTIONS = { root: (__dirname + '/front-end') }

// Permitir CORS
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}
// CALLBACKS PARA SELECTS DEL MODELO
const CB_MODEL_SELECTS = {
    test_db: async (req, res) => {
        try {
            let proyectos = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Proyectos"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            res.status(200).json(proyectos)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    getProyectos: async (req, res) => {
        try {
            let proyectos = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Proyectos"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            // console.log( proyectos ) // Para comprobar qué se ha devuelto en proyectos
            //proyectos = proyectos.data.map(e => e.data)  // Elimina la info innecesaria
            CORS(res)
                .status(200)
                .json(proyectos)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    getProyectosConPersonas: async (req, res) => {
        try {
            let proyectos = await client.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Proyectos"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            // console.log( proyectos ) // Para comprobar qué se ha devuelto en proyectos
            //proyectos = proyectos.data.map(e => e.data)  // Elimina la info innecesaria
            CORS(res)
                .status(200)
                .json(proyectos)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
}



// CALLBACKS ADICIONALES
const CB_OTHERS = {
    home: async (req, res) => {
        try {
            res.status(200).send("Microservicio Proyectos: home page");
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    about: async (req, res) => {
        try {
            res.status(200).send("Microservicio Proyectos: about page");
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    listar: async (req, res) => {
        try {
            res.sendFile("/listar.html",
                SEND_FILE_OPTIONS,
                function (err) {
                    if (err) {
                        console.error(err);
                    }
                })
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

}

// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }
