/*Controlador principa de las funciones*/

const bcrypt = require ('bcryptjs');
const { response } = require('express');
const passport = require('passport')
const {tokenSign, verifyToken} = require('../controladores/tokens');

//Conexión a BD de postgres 
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


//Permite verificar si un usuario se encuentra autenticado o no
const checkAuth = async (req,res,next) => {

    try{
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
    }catch (e){
        console.log(e);
        res.send({error: 'No tienes autorización para crear este registro'})
    }


}

/*Las funciones checkRole, permiten verificar si un usuario cuenta con los permisos para llevar a cabo una acción 
dentro de un pefil, en caso de no tenerla, el usuario obtendra como resultado el msj que indica la no autorización
a la tarea que desea realizar*/

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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
        res.send({ error: 'No tienes autorización' })
    }}
    

}

//ruta users, que permite retornar usuarios de la base de datos
const createUser =  async(req,res) => { 

    try{
        const {idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, contraseniaUsuario, nombreUsuario, direccionUsuario, servicioMedico, fechaNacimientoPaciente, servicioMedicoHospital,
            cambioContrasenia} = req.body;
    
        if(tipoUsuario == 'H'){ 
            const response = await pool.query('insert into historia.hospital ("idHospital", "tipoUsuario", "emailHospital", "telefonoHospital", "contraseniaHospital", "nombreHospital", "direccionHospital", "servicioMedicoHospital") values ($1, $2, $3, $4, $5, $6, $7, $8)' , 
            [idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, await encrypt(contraseniaUsuario), nombreUsuario, direccionUsuario, servicioMedicoHospital])
            console.log(response);
            res.json({
                message: 'Usuario añadido correctamente'
            })
    
        } else{
    
            const response = await pool.query('insert into historia.paciente ("idPaciente", "tipoUsuario", "emailPaciente", "telefonoPaciente", "contraseniaPaciente", "nombrePaciente", "direccionPaciente", "fechaNacimientoPaciente") values ($1, $2, $3, $4, $5, $6, $7, $8)' , 
            [idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, await encrypt(contraseniaUsuario), nombreUsuario, direccionUsuario, fechaNacimientoPaciente])
            console.log(response);
            res.json({
                message: 'Usuario añadido correctamente'
            })
        }

    }catch(e){
        console.log(e);
        res.json({
            error: 'El usuario NO fue añadido'
        })
    }

    
  
}

//ruta users, que permite retornar usuarios de la base de datos
const createMedico =  async(req,res) => { 

    try{
        const {idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, contraseniaUsuario, nombreUsuario, direccionUsuario, servicioMedico, fechaNacimientoPaciente, servicioMedicoHospital,} = req.body;
    
            const response = await pool.query('insert into historia.medico ("idMedico", "tipoUsuario", "emailMedico", "telefonoMedico", "contraseniaMedico", "nombreMedico", "direccionMedico", "servicioMedico") values ($1, $2, $3, $4, $5, $6, $7, $8)' , 
            [idUsuario, tipoUsuario, emailUsuario, telefonoUsuario, await encrypt(contraseniaUsuario), nombreUsuario, direccionUsuario, servicioMedico])
            console.log(response);
            res.json({
                message: 'Usuario añadido correctamente'
            })
    }catch (e){
        console.log(e);
        res.json({
            error: 'El usuario NO fue añadido'
        })
    }

  
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
            console.log()
            res.json({
                error: 'Contraseña incorrecta'
            })
        }

    } catch (e){
        console.log(e)
        res.json({
            error: 'Contraseña o ID incorrecta'
        })
    }

}

const createObservaciones = async (req,res) => {
    try{
    const {observacionMedica,estadoPaciente,especialidadPaciente,idMedico,idPaciente,idHospital} = req.body;

        const response = await pool.query('insert into historia.observacion ("observacionMedica","estadoPaciente","especialidadPaciente","idMedico","idPaciente","idHospital") values ($1, $2, $3, $4, $5, $6)' , 
        [observacionMedica,estadoPaciente,especialidadPaciente,idMedico,idPaciente,idHospital])
        console.log(response);
        res.json({
            message: 'Observacion añadida correctamente'
        }) } 
        catch(e){
            console.log(e);
            res.json({
                error: 'Error al añadir historia del paciente'
            }) } 
        
}

/*Cada uno de los perfiles puede visualizar los datos que le correspondan según requerimiento a partir de la validación 
del usuario. Por otra parte, si el usuario desea descargar el archivo que muestra la información de cada paciente
se ejecuta a función descargaJSON*/

const consultarObservacionesPaciente = async (req,res) => {
    try{
        const {idPaciente,descarga} = req.body;
        const response = await pool.query('select * from historia.observacion where "idPaciente" = $1',[idPaciente]);
        if (descarga == 'true'){
            descargaJSON(response)
            if (response.rowCount > 0){
                res.json({
                    message: 'Archivo PDF generado exitosamente'
                })
            } else{
                console.log(e);
                res.json({
                    message: 'Registro de paciente no encontrado'
                })
            }
            
        } else {
            if(response.rowCount == 0){
                res.json({
                    message: 'Registro de paciente no encontrado'
                })
            } else{
                res.status(200).json(response.rows);
            }
            
        }
    } catch (e){
        console.log(e);
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
            if (response.rowCount > 0){
                res.json({
                    message: 'Archivo PDF generado exitosamente'
                })
            } else{
                console.log(e);
                res.json({
                    message: 'Registro de paciente no encontrado'
                })
            }
        } else {
            if(response.rowCount == 0){
                res.json({
                    message: 'Registro de paciente no encontrado'
                })
            } else{
                res.status(200).json(response.rows);
            }
            
        }
    } catch (e){
        console.log(e);
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
            if (response.rowCount > 0){
                res.json({
                    message: 'Archivo PDF generado exitosamente'
                })
            } else{
                console.log();
                res.json({
                    message: 'Registro de paciente no encontrado'
                })
            }
        } else {
            if(response.rowCount == 0){
                res.json({
                    message: 'Registro de paciente no encontrado'
                })
            } else{
                res.status(200).json(response.rows);
            }
            
        }
    } catch (e){
        console.log(e);
        res.json({
            message: 'Registro de paciente no encontrado'
        })
    }
}

/*Por medio de esta función, los usuarios pueden descargar la infromación de pacientes según corresponda es decir 
-> Pacientes: Descargar su historial medico 
-> Medicos: Descargar el historial medico de un paciente determinado 
-> Hospital: Descargar la información de un paciente determinado del hospital
*/

const descargaJSON = async (datos) => {

    try{
        const PDFDocument = require("pdfkit"); 
        const fs = require("fs");
        const doc = new PDFDocument(); // Se inicia la creación de documento PDF

        doc.text("Información Paciente:");

        /*Se asgina cada dato del paciente en una variable homonima y se asigna como texto dentro del archivo PDF*/
        datos.rows.forEach((registro) => {

            const paciente = `Paciente: ${registro['idPaciente']}`;
            const medico = `Médico: ${registro['idMedico']}`;
            const hospital = `Hospital: ${registro['idHospital']}`;
            const observaciones = `Observaciones Médicas: ${registro['observacionMedica']}`;
            const estado = `Estado del paciente: ${registro['estadoPaciente']}`;
            const especialidad = `Especialidad Médico: ${registro['especialidadPaciente']}`;

            doc.text("       "); 
            doc.text("       "); 
            doc.text(paciente);
            doc.text(medico);
            doc.text(hospital);
            doc.text(observaciones);
            doc.text(estado);
            doc.text(especialidad);
        });

        /*Se da nombre al archivo creado PDF*/
        doc.pipe(fs.createWriteStream("pacientes.pdf"));

        //Se finaliza la realización del documento 
        doc.end();

        console.log("Archivo PDF generado exitosamente.");
    } catch (e){
        console.log(e);
        res.json({
            message: 'Archivo PDF NO generado'
        })
    } 
    



}

module.exports = {createUser, loginMedico, loginPaciente, loginHospital, createMedico, checkAuth, checkRoleAuth, createObservaciones, checkRoleAuthMed, 
    consultarObservacionesPaciente, consultarObservacionesHospital, consultarObservacionesMedico, checkRoleAuthPac, encrypt}





