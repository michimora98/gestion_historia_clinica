//Conexión a postgres 
const bcrypt = require ('bcryptjs');
const { response } = require('express');
const passport = require('passport')
const {tokenSign, verifyToken} = require('../controladores/tokens');

const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password : 'root',
    database : 'bd_historia_clinica',
    port : '5432'
}) 

//Encriptar contraseña 
const encrypt = async (textPplain) => {
    const hash = await bcrypt.hash(textPplain, 10)
    return hash
}
//Comparar contraseña dada desde el postman y la que se encuentra almacenada en la tabla
const compare = async (passwordPlain, hasPassword) => {
    return await bcrypt.compare(passwordPlain, hasPassword)
}

const checkAuth = async (req,res,next) => {

        const tokenHeader = req.headers.authorization
        if (!tokenHeader) {
            res.send({ error: 'No tienes autorización para crear este registo' })
            return
        }
        const token = tokenHeader.split(' ').pop()
        const tokenData = await verifyToken(token)
        console.log (tokenData)
        if(tokenData._id){
            next()
        } else {
            res.send({error: 'No tienes autorización para crear este registro'})
        }


}

const checkRoleAuth =  async (req,res,next) => {
    try {
        const tokenHeader = req.headers.authorization
        if (!tokenHeader) {
            res.send({ error: 'No tienes autorización para crear este usuario' })
            return
        }
        const token = tokenHeader.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await pool.query('SELECT * FROM historia.hospital WHERE "idHospital" = $1', [tokenData._id]);

        if(userData.rows[0]['tipoUsuario'] == 'H'){
            next()
        } else {
            res.status({error:'No tienes permisos'})
        }
    } catch (e) {{
        res.send({ error: 'No tienes autorización para crear este usuario' })
    }}
    

}

const checkRoleAuthMed =  async (req,res,next) => {
    try {
        const tokenHeader = req.headers.authorization
        if (!tokenHeader) {
            res.send({ error: 'No tienes autorización para crear observaciones' })
            return
        }
        const token = tokenHeader.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await pool.query('SELECT * FROM historia.medico WHERE "idMedico" = $1', [tokenData._id]);

        if(userData.rows[0]['tipoUsuario'] == 'M'){
            next()
        } else {
            res.status({error:'No tienes permisos'})
        }
    } catch (e) {{
        res.send({ error: 'No tienes autorización para crear observaciones' })
    }}
    

}

const checkRoleAuthPac =  async (req,res,next) => {
    try {
        const tokenHeader = req.headers.authorization
        if (!tokenHeader) {
            res.send({ error: 'No tienes autorización' })
            return
        }
        const token = tokenHeader.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await pool.query('SELECT * FROM historia.paciente WHERE "idPaciente" = $1', [tokenData._id]);

        if(userData.rows[0]['tipoUsuario'] == 'P'){
            next()
        } else {
            res.status({error:'No tienes permisos'})
        }
    } catch (e) {{
        res.send({ error: 'No tienes autorización' })
    }}
    

}

//ruta users, que permite retornar usuarios de la base de datos
const getUsers =  async(req,res) => { 
    const response = await pool.query('select * from historia.medico');
    res.status(200).json(response.rows);
};

//ruta users, que permite retornar usuarios de la base de datos
const createUser =  async(req,res) => { 

    const {idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, contraseniaUsuario, nombreUsuario, direccionUsuario, servicioMedico, fechaNacimientoPaciente, servicioMedicoHospital,
        confirmacionUsuario,cambioContrasenia} = req.body;

    if(tipoUsuario == 'H'){ 
        const response = await pool.query('insert into historia.hospital ("idHospital", "tipoUsuario", "emailHospital", "telefonoHospital", "contraseniaHospital", "nombreHospital", "direccionHospital", "servicioMedicoHospital", "confirmacionHospital" ,"cambioContrasenia") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)' , 
        [idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, await encrypt(contraseniaUsuario), nombreUsuario, direccionUsuario, servicioMedicoHospital, confirmacionUsuario,cambioContrasenia])
        console.log(response);
        res.json({
            message: 'Usuario añadido correctamente'
        })

    } else{

        const response = await pool.query('insert into historia.paciente ("idPaciente", "tipoUsuario", "emailPaciente", "telefonoPaciente", "contraseniaPaciente", "nombrePaciente", "direccionPaciente", "fechaNacimientoPaciente",  "confirmacionPaciente" ,"cambioContrasenia") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)' , 
        [idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, await encrypt(contraseniaUsuario), nombreUsuario, direccionUsuario, fechaNacimientoPaciente, confirmacionUsuario,cambioContrasenia])
        console.log(response);
        res.json({
            message: 'Usuario añadido correctamente'
        })
    }
  
}

//ruta users, que permite retornar usuarios de la base de datos
const createMedico =  async(req,res) => { 

    const {idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, contraseniaUsuario, nombreUsuario, direccionUsuario, servicioMedico, fechaNacimientoPaciente, servicioMedicoHospital,
        confirmacionUsuario,cambioContrasenia} = req.body;

        const response = await pool.query('insert into historia.medico ("idMedico", "tipoUsuario", "emailMedico", "telefonoMedico", "contraseniaMedico", "nombreMedico", "direccionMedico", "servicioMedico", "confirmacionUsuario" ,"cambioContrasenia") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)' , 
        [idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, await encrypt(contraseniaUsuario), nombreUsuario, direccionUsuario, servicioMedico, confirmacionUsuario,cambioContrasenia])
        console.log(response);
        res.json({
            message: 'Usuario añadido correctamente'
        })

  
}

const loginMedico = async (req,res) => {

    const { id,contrasenia } = req.body;
    const user = await pool.query('SELECT * FROM historia.medico WHERE "idMedico" = $1', [id]);

    try{

        if(!user){
            res.json({
                error: 'ID incorrecto'
            })
        }
    
        const comparar = await compare (contrasenia, user.rows[0]['contraseniaMedico'] )
        const tokenSession = await tokenSign (user.rows[0]['idMedico'],user.rows[0]['tipoUsuario'])
    
        if (comparar) {
            res.json({
                message: 'Inicio de sesión exitoso',
                tokenSession
            }) 
        } else {
            res.json({
                error: 'Contraseña incorrecta'
            })
        
    
        }

    } catch (e){
        res.json({
            error: 'Contraseña o ID incorrecta'
        })
    }

    
}

const loginHospital = async (req,res) => {

    try{
        const { id,contrasenia } = req.body;
        const user = await pool.query('SELECT * FROM historia.hospital WHERE "idHospital" = $1', [id]);

        if(!user){
            res.json({
                error: 'ID incorrecto'
            })
        }

        const comparar = await compare (contrasenia, user.rows[0]['contraseniaHospital'] )
        const tokenSession = await tokenSign (user.rows[0]['idHospital'],user.rows[0]['tipoUsuario'])

        if (comparar) {
            res.json({
                message: 'Inicio de sesión exitoso',
                tokenSession
            }) 
        } else {
            res.json({
                error: 'Contraseña incorrecta'
            })
        }
    } catch (e){
        res.json({
            error: 'Contraseña o ID incorrecta'
        })
    }

}

const loginPaciente = async (req,res) => {

    try{

        const { id,contrasenia } = req.body;
        const user = await pool.query('SELECT * FROM historia.paciente WHERE "idPaciente" = $1', [id]);

        if(!user){
            res.json({
                error: 'ID incorrecto'
            })
        } 
        
        const comparar = await compare (contrasenia, user.rows[0]['contraseniaPaciente'] )
        const tokenSession = await tokenSign (user.rows[0]['idPaciente'],user.rows[0]['tipoUsuario'])

        if (comparar) {
            res.json({
                message: 'Inicio de sesión exitoso',
                tokenSession
            }) 
        } else {
            res.json({
                error: 'Contraseña incorrecta'
            })
        }

    } catch (e){
        res.json({
            error: 'Contraseña o ID incorrecta'
        })
    }

}

const createObservaciones = async (req,res) => {
    const {observacionMedica,estadoPaciente,especialidadPaciente,idMedico,idPaciente,idHospital} = req.body;

        const response = await pool.query('insert into historia.observacion ("observacionMedica","estadoPaciente","especialidadPaciente","idMedico","idPaciente","idHospital") values ($1, $2, $3, $4, $5, $6)' , 
        [observacionMedica,estadoPaciente,especialidadPaciente,idMedico,idPaciente,idHospital])
        console.log(response);
        res.json({
            message: 'Observacion añadida correctamente'
        })
}

const consultarObservacionesPaciente = async (req,res) => {
    try{
        const {idPaciente,descarga} = req.body;
        const response = await pool.query('select * from historia.observacion where "idPaciente" = $1',[idPaciente]);
        if (descarga == 'true'){
            descargaJSON(response)
            res.json({
                message: 'Archivo PDF generado exitosamente'
            })
        } else {
            res.status(200).json(response.rows);
        }
    } catch (e){
        res.json({
            message: 'Registro de paciente no encontrado'
        })
    }
    
    
}

const consultarObservacionesMedico = async (req,res) => {
    try {
        const {idMedico,descarga} = req.body;
        const response = await pool.query('select * from historia.observacion where "idMedico" = $1',[idMedico]);
        if (descarga == 'true'){
            descargaJSON(response)
            res.json({
                message: 'Archivo PDF generado exitosamente'
            })
        } else {
            res.status(200).json(response.rows);
        }
    } catch (e) {
        res.json({
            message: 'Registro de paciente no encontrado'
        })
    }
    
}

const consultarObservacionesHospital = async (req,res) => {
    try {
        const {idHospital,descarga} = req.body;
        const response = await pool.query('select * from historia.observacion where "idHospital" = $1',[idHospital]);
        if (descarga == 'true'){
            descargaJSON(response)
            res.json({
                message: 'Archivo PDF generado exitosamente'
            })
        } else {
            res.status(200).json(response.rows);
        }
    } catch (e) {
        res.json({
            message: 'Registro de paciente no encontrado'
        })
    }
}

const descargaJSON = async (datos) => {

    const PDFDocument = require("pdfkit");
    const fs = require("fs");
    const doc = new PDFDocument();

    doc.text("Información Paciente:");
    datos.rows.forEach((registro) => {

        const paciente = `Paciente: ${registro['idPaciente']}`;
        const medico = `Médico: ${registro['idMedico']}`;
        const hospital = `Hospital: ${registro['idHospital']}`;
        const observaciones = `Observaciones Médicas: ${registro['observacionMedica']}`;
        const estado = `Estado del paciente: ${registro['estadoPaciente']}`;
        const especialidad = `Especialidad Médico: ${registro['especialidadPaciente']}`;

        doc.text(paciente);
        doc.text(medico);
        doc.text(hospital);
        doc.text(observaciones);
        doc.text(estado);
        doc.text(especialidad);
      });

    doc.pipe(fs.createWriteStream("pacientes.pdf"));
    doc.end();

    console.log("Archivo PDF generado exitosamente.");

}

module.exports = { getUsers, createUser, loginMedico, loginPaciente, loginHospital, createMedico, checkAuth, checkRoleAuth, createObservaciones, checkRoleAuthMed, 
    consultarObservacionesPaciente, consultarObservacionesHospital, consultarObservacionesMedico, checkRoleAuthPac, encrypt}





