//Rutas implementadas en las funciones del controlador principal, estas se ejecutan por medio del consumo de API en POSTMAN

const { Router } = require ('express'); 
const rutas = Router(); 

const {createUser, loginPaciente,loginHospital, loginMedico} = require('../controladores/index.controllers');

rutas.post('/login/P', loginPaciente); 
rutas.post('/login/H', loginHospital); 
rutas.post('/login/M', loginMedico); 
rutas.post('/registro', createUser); 


module.exports = rutas;