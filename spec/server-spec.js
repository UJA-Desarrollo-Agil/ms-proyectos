/**
 * Fichero con la especificación de las pruebas TDD para callback.js
 * Este fichero DEBE llamarse callback-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 */


const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('Servidor Proyectos:', () => {
  describe('Páginas estáticas', () => {
    it('Devuelve Proyectos Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          // console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text === "Microservicio Proyectos: home page")
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve Proyectos Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          // console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text === "Microservicio Proyectos: página Acerca De")
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  describe('Acceso a BBDD:', () => {
    it('Devuelve \"UJA Contabilidad\" al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "UJA Contabilidad");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });



    it('Devuelve un vector de tamaño 2 al consultar mediante getTodos', (done) => {
      supertest(app)
        .get('/getTodos')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "getProyectos BODY: ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.length === 2);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve 2 personas en el segundo proyecto al consultar getTodosConPersonas', (done) => {
      supertest(app)
        .get('/getTodosConPersonas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "getProyectosConPersonas BODY: ", res.body.data ); // Para comprobar qué contiene exactamente res.body
          //console.log( "getProyectosConPersonas BODY data.length: ", res.body.data.length ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[1].data.hasOwnProperty('datos_personas'));
          assert(res.body.data[1].data.datos_personas.length === 2);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  })
});
