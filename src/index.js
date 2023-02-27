const express = require ('express'); 
const app = express(); 

//middlewares 
app.use(express.json());
app.use(express.urlencoded()); //Permite convertir en un objeto el dato de un formulario


//definir las rutas
app.use(require('./rutas/index'));
app.use(require('./rutas/medicos'));
app.use(require('./rutas/observaciones'));
app.use(require('./rutas/cambiarContrasena'));

app.listen (3000); //puerto
console.log ('Server on port 3000')