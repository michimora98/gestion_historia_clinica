const { Router } = require ('express'); 
const rutas = Router();

const {cambiarContrasenaM,cambiarContrasenaP,cambiarContrasenaH, recuperarContrasena} = require('../controladores/contrasena.controller');
const {loginPaciente,loginHospital, loginMedico, checkRoleAuthPac, checkAuth, checkRoleAuth, checkRoleAuthMed} = require('../controladores/index.controllers');

rutas.post('/cambiarContrasenaP', checkAuth,checkRoleAuthPac,cambiarContrasenaM); 
rutas.post('/cambiarContrasenaM', checkAuth,checkRoleAuthMed,cambiarContrasenaP); 
rutas.post('/cambiarContrasenaH', checkAuth,checkRoleAuth,cambiarContrasenaH); 
rutas.get('/recuperarContrasena', recuperarContrasena); 
rutas.post('/login/P', loginPaciente); 
rutas.post('/login/H', loginHospital); 
rutas.post('/login/M', loginMedico);

module.exports = rutas;