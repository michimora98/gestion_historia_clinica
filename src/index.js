//Permite establecer donde se alojan las rutas que serán ejecutadas a lo largo de la ejecución del programa
const express = require ('express'); 
const app = express(); 

//middlewares 
app.use(express.json());
app.use(express.urlencoded()); 


//definir las rutas
app.use(require('./rutas/index'));
app.use(require('./rutas/medicos'));
app.use(require('./rutas/observaciones'));
app.use(require('./rutas/cambiarContrasena'));

app.listen (3000); //puerto
console.log ('Server on port 3000')