/*Controlador realizado para la ejecución de todas las funciones referentes a la contraseña*/

const bcrypt = require ('bcryptjs');
const { response } = require('express'); 
const passport = require('passport') 

/*Traer funciones del controlador principal*/
const { encrypt, checkRoleAuthPac, checkRoleAuthMed, checkRoleAuth } = require('../controladores/index.controllers');

// Se lleva a cabo la Conexión a la BD de postgres 
const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password : 'root',
    database : 'bd_historia_clinica',
    port : '5432'
}) 

/*Permite llevar a cabo el cambio de contraseña teniendo ya una sesión iniciada, es decir, cuando el usuario por si mismo decide
cambiar su contraseña y no porque la haya olvidado*/
const cambiarContrasenaP = async (req,res) => {

    checkRoleAuthPac

    const { id, nuevaContrasena} = req.body;

    try {
      // Buscar el usuario por correo electrónico
      const user = await pool.query('SELECT * FROM historia.paciente WHERE "idPaciente" = $1', [id]);
  
      if (user.rows.length === 0) {
        // No se encontró el usuario
        return res.json({ error: 'Usuario no encontrado' });
      }
  
      // Actualizar la contraseña del usuario en la base de datos y encriptar la contraseña
      console.log({message: nuevaContrasena})
      const response = await pool.query('UPDATE historia.paciente SET "contraseniaPaciente" = $1 WHERE "idPaciente" = $2', [await encrypt(nuevaContrasena), user.rows[0][id]]);
  
      // Enviar la nueva contraseña al correo electrónico del usuario (opcional)
      // ...


      console.log(response)
      res.send({ message: 'Contraseña restablecida correctamente' });
    } catch (e) {
        console.log(e)
      res.send({ error: 'Ocurrió un error al restablecer la contraseña' });
    }
    

}  

const cambiarContrasenaM = async (req,res) => {

  checkRoleAuthMed

  const { id, nuevaContrasena} = req.body;

  try {
    // Buscar el usuario por correo electrónico
    const user = await pool.query('SELECT * FROM historia.medico WHERE "idMedico" = $1', [id]);

    if (user.rows.length === 0) {
      // No se encontró el usuario
      return res.json({ error: 'Usuario no encontrado' });
    }

    // Actualizar la contraseña del usuario en la base de datos y encriptar la contraseña
    console.log({message: nuevaContrasena})
    const response = await pool.query('UPDATE historia.medico SET "contraseniaMedico" = $1 WHERE "idMedico" = $2', [await encrypt(nuevaContrasena), user.rows[0][id]]);

    // Enviar la nueva contraseña al correo electrónico del usuario (opcional)
    // ...


    console.log(response)
    res.send({ message: 'Contraseña restablecida correctamente' });
  } catch (e) {
      console.log(e)
    res.send({ error: 'Ocurrió un error al restablecer la contraseña' });
  }
  

}  

const cambiarContrasenaH = async (req,res) => {

  checkRoleAuth

  const { id, nuevaContrasena} = req.body;

  try {
    // Buscar el usuario por correo electrónico
    const user = await pool.query('SELECT * FROM historia.hospital WHERE "idHospital" = $1', [id]);

    if (user.rows.length === 0) {
      // No se encontró el usuario
      return res.json({ error: 'Usuario no encontrado' });
    }

    // Actualizar la contraseña del usuario en la base de datos y encriptar la contraseña
    console.log({message: nuevaContrasena})
    const response = await pool.query('UPDATE historia.hospital SET "contraseniaHospital" = $1 WHERE "idHospital" = $2', [await encrypt(nuevaContrasena), user.rows[0][id]]);

    // Enviar la nueva contraseña al correo electrónico del usuario (opcional)
    // ...


    console.log(response)
    res.send({ message: 'Contraseña cambiada correctamente' });
  } catch (e) {
      console.log(e)
    res.send({ error: 'Ocurrió un error al cambiar la contraseña' });
  }
  

}  

/*Permite llevar a cabo el cambio de contraseña en caso de que el usuario haya olvidado su contraseña teniendo en cuenta 
el tipo de usuario*/

const recuperarContrasena = async (req, res) => {

  const {id, tipoUsuario, nuevaContrasena} = req.body;

  if(tipoUsuario == 'H') {
    try {
      const user = await pool.query('SELECT * FROM historia.hospital WHERE "idHospital" = $1', [id]);
      const response = await pool.query('UPDATE historia.hospital SET "contraseniaHospital" = $1 WHERE "idHospital" = $2', [await encrypt(nuevaContrasena), user.rows[0][id]]);
      res.send({ message: 'Contraseña restablecida correctamente' });
    } catch (e){
      console.log(e)
      res.send({ error: 'Ocurrió un error al restablecer la contraseña puede que el usuario no exista' });
    }
  } else if (tipoUsuario == 'P'){ 
    try {
      const user = await pool.query('SELECT * FROM historia.paciente WHERE "idPaciente" = $1', [id]);
      const response = await pool.query('UPDATE historia.paciente SET "contraseniaPaciente" = $1 WHERE "idPaciente" = $2', [await encrypt(nuevaContrasena), user.rows[0][id]]);
      res.send({ message: 'Contraseña restablecida correctamente' });
    } catch (e){
      console.log(e)
      res.send({ error: 'Ocurrió un error al restablecer la contraseña puede que el usuario no exista' });
    }
  }
  else {
    try {
      const user = await pool.query('SELECT * FROM historia.medico WHERE "idMedico" = $1', [id]);
      const response = await pool.query('UPDATE historia.medico SET "contraseniaMedico" = $1 WHERE "idMedico" = $2', [await encrypt(nuevaContrasena), user.rows[0][id]]);
      res.send({ message: 'Contraseña restablecida correctamente' });
    } catch (e){
      console.log(e)
      res.send({ error: 'Ocurrió un error al restablecer la contraseña puede que el usuario no exista' });
    }
  }
}

module.exports = {cambiarContrasenaM,cambiarContrasenaP,cambiarContrasenaH,recuperarContrasena}
