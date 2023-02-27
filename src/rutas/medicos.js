const { Router } = require ('express'); 
const rutas = Router();

const {checkAuth, checkRoleAuth, createMedico} = require('../controladores/index.controllers');

rutas.post('/registroMedico', checkAuth, checkRoleAuth, createMedico); 

module.exports = rutas;