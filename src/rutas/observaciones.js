const { Router } = require ('express'); 
const rutas = Router();

const {checkAuth, checkRoleAuthMed, createObservaciones,consultarObservacionesPaciente, consultarObservacionesMedico, consultarObservacionesHospital, checkRoleAuthPac, checkRoleAuth} = require('../controladores/index.controllers');

rutas.post('/registroObservaciones',checkAuth,checkRoleAuthMed ,createObservaciones); 
rutas.get('/consultarObservacionesM',checkAuth,checkRoleAuthMed, consultarObservacionesMedico); 
rutas.get('/consultarObservacionesP',checkAuth,checkRoleAuthPac, consultarObservacionesPaciente); 
rutas.get('/consultarObservacionesH',checkAuth,checkRoleAuth, consultarObservacionesHospital); 


module.exports = rutas;