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
    it('Devuelve Proyectos About PAGE', (done) => {
      supertest(app)
        .get('/about')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          // console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text === "Microservicio Proyectos: about page")
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  describe('Acceso a BBDD:', () => {
    it('Devuelve Ana al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Ana");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve la página de listado de proyectos al consultar /listar', (done) => {
      supertest(app)
        .get('/listar')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect(function (res) {
          // console.log( res.text ); // Para comprobar qué contiene exactamente res.text
          assert(res.text.includes("Listado de proyectos"))
        })
        .end((error) => {
          error ? done.fail(error) : done()
        });
    });

    it('Devuelve un vector de tamaño 3 al consultar mediante getProyectosAll', (done) => {
      supertest(app)
        .get('/getProyectosAll')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.length === 3);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  })
});