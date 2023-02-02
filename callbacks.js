// callbacks.js - callbacks for microservicio-1.
// CALLBACKS DEL MODELO
// CALLBACKS DEL MODELO
const faunadb = require('faunadb'),
    q = faunadb.query;

const client_proyectos = new faunadb.Client({
    secret: 'fnAE6dR1GVAA1qiaRxaSZtbA7yGo6OpT2cB5NQnb',
});

const URL_MS_PERSONAS = "http://localhost:8002";

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
            let proyectos = await client_proyectos.query(
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
    getTodos: async (req, res) => {
        try {
            let proyectos = await client_proyectos.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Proyectos"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            // console.log( proyectos ) // Para comprobar qué se ha devuelto en proyectos
            CORS(res)
                .status(200)
                .json(proyectos)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    getTodosConPersonas: async (req, res) => {
        try {
            let proyectos = await client_proyectos.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Proyectos"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            let url=URL_MS_PERSONAS+"/getTodas"
            let response_personas = await fetch("https://www.ujaen.es");
            //let personas = await response_personas.json()
            //console.log( response_personas )

            // Comprobaciones para ver qué almacenan los datos descargados
            // y así poder usarlos en las expresiones
            
            console.log( "Proyectos: \n", proyectos ) // Para comprobar qué se ha devuelto en proyectos
            //console.log( "Personas: \n", personas ) // Para comprobar qué se ha devuelto en personas
            // para comprobar las personas dentro de cada proyecto
            /*proyectos.data.forEach(e => {
                console.log( e.data )
            });
            // usando documento.ref.value.id puedo saber el id de cada documento
            personas.data.forEach(e => {
                console.log( e.ref.value.id, e.data )
            });
            
            // Incluyo los datos de cada persona que hay en el proyecto
            proyectos.data.forEach( pr=>{
                // Creo un nuevo campo llamado datos_personas en cada proyecto
                pr.data.datos_personas=personas.data.filter( pe => 
                    pr.data.personas.join().includes( pe.ref.value.id)
                )
            });
            */
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
            res.status(200).json({mensaje: "Microservicio Proyectos: home"});
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    acercaDe: async (req, res) => {
        try {
            res.status(200).json({mensaje: "Microservicio Proyectos: acerca de"});
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

}

// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }


//CB_MODEL_SELECTS.getProyectosConPersonas() // Para depuración