//Rutas implementadas en las funciones qu permiten la creación del usuario medico, estas se ejecutan por medio del consumo de API en POSTMAN

const { Router } = require ('express'); 
const rutas = Router();

const {checkAuth, checkRoleAuth, createMedico} = require('../controladores/index.controllers');

rutas.post('/registroMedico', checkAuth, checkRoleAuth, createMedico); 

module.exports = rutas;