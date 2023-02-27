const { Router } = require ('express'); 
const rutas = Router(); 

//ruta users, que permite retornar usuarios de la base de datos
const {getUsers, createUser, loginPaciente,loginHospital, loginMedico} = require('../controladores/index.controllers');

rutas.get('/users', getUsers); 
rutas.post('/login/P', loginPaciente); 
rutas.post('/login/H', loginHospital); 
rutas.post('/login/M', loginMedico); 
rutas.post('/registro', createUser); 


module.exports = rutas;