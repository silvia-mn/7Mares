import  Empresa  from './models/empresa.model.js';
import  Crucero  from './models/crucero.model.js';
import  Cliente  from './models/cliente.model.js';
import  Compra  from './models/compra.model.js';
import Administrador from './models/administrador.model.js';

import Knex from 'knex';
import express from 'express';
import cors from 'cors';
import moment from 'moment';
import { esTelefonoValido, esFechaValida, esValidoDNI, esValidoEmail, esValidoCIF, esValidoCVV, esValidoCard, esValidoExpiracion } from './lib/validators.js';
import { development } from './knexfile.js';
import passport from 'passport';
import session from 'express-session';
import strategyInitGeneral from './lib/AuthStrategyGeneral.js';


import CryptoES from 'crypto-es';
import axios from "axios";
// Instanciamos Express y el middleware de JSON y CORS -
const app = express();
app.use(express.json());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

// Conexiones a la base de datos
const dbConnection = Knex(development);
Empresa.knex(dbConnection);
Crucero.knex(dbConnection); 
Cliente.knex(dbConnection);
Compra.knex(dbConnection);
Administrador.knex(dbConnection);


// * ========================================================================================================================================= 
// * ====================================================================  PASSPORT ==========================================================
// * ========================================================================================================================================= 

// TODO Inicialización del passport CLIENTE ===================================================================================================

app.use(session({
    secret: 'cines-session-cookie-key', // Secreto de la sesión (puede ser cualquier identificador unívoco de la app, no es público al usuario)
    name: 'SessionCookie', // Nombre de la sesión
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000000, // Expiración de la sesión
  },
}));
app.use(passport.initialize());
app.use(passport.session());
strategyInitGeneral(passport);


// * ========================================================================================================================================= 
// * =======================================================================  LOGIN ==========================================================
// * ========================================================================================================================================= 

// TODO Endpoint: POST /LOGIN  CLIENTE ================================================================================================

app.post('/login', passport.authenticate('localGeneral'), (req, res) => {
    if (!!req.user) res.status(200).json(req.user) 
    else res.status(500).json({status: "error"})
});

app.get('/user', (req, res) => {
  if (!!req.user) res.status(200).json(req.user) 
  else res.status(500).json({status: "error"})
});

app.get('/logout',(req,res)=>{
  req.logout(err => {
    if (!!err){
      res.status(500).json({error:err});
    }else{
      res.status(200).json({status:'OK'});
    }
  });
});

// * ========================================================================================================================================= 
// * =======================================================================  CLIENTE ======================================================== 
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR CLIENTE --> Ok  ============================================================================================
app.post('/registrarCliente', (req, res) => {
    const { nombre, email, password, dni, fecha, telefono } = req.body;
  
    //^ Validar que se proporcionen todos los campos requeridos
    if (!nombre || !email || !password || !dni || !fecha || !telefono) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }
  
    //^Validar el formato del email
    if (!esValidoEmail(email)) {
      return res.status(400).json({ mensaje: 'Formato de email inválido' });
    }
  
    //^ Validar el formato del DNI
    if (!esValidoDNI(dni)) {
      return res.status(400).json({ mensaje: 'Formato de DNI inválido' });
    }
  
    //^ Validar el formato de la fecha de nacimiento
    if (!esFechaValida(fecha)) {
      return res.status(400).json({ mensaje: 'Formato de fecha inválido' });
    }
  
    //^ Validar el formato del número de teléfono
    if (!esTelefonoValido(telefono)) {
      return res.status(400).json({ mensaje: 'Formato de número de teléfono inválido' });
    }
    //^ Guardar los datos del cliente en la base de datos
    Cliente.query().insert({
    nombre,
    email,
    fecha,
    dni,
    telefono: Number(telefono),
    unsecurePassword: password
    }).then(results => res.status(200).json({status: "Ok"})).catch(err => res.status(500).json({error: err}));
  });
  

// TODO Endpoint: POST /BORRAR CLIENTE --> Ok ========================================================================================
app.post('/borrarCliente', (req, res) => {
    if(!!req.user){
      if(req.user.rol === "cliente"){
      const clienteId = req.user.email;
      Cliente.query().deleteById(clienteId).then(results => res.status(200).json({status: "OK"})).catch(err => res.status(500).json({error: err}));
    }else{
      res.status(401).json({error:'No autorizado'});
    }
    }else{
    res.status(401).json({error:'No autenticado'});
    }
  });


// * ========================================================================================================================================= 
// * =======================================================================  EMPRESA- NAVIERA ========================================================  
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR EMPRESA --> Ok  ============================================================================================
app.post('/registrarEmpresa', (req, res) => {

  const { nombre, email, password, cif, puerto, telefono, responsable, euros} = req.body;

  //^ Validar que se proporcionen todos los campos requeridos 
  if (!nombre || !email || !password || !cif || !puerto  || !telefono || !responsable || !euros) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  //^Validar el formato del email
  if (!esValidoEmail(email)) {
    return res.status(400).json({ mensaje: 'Formato de email inválido' });
  }

  //^ Validar el formato del CIF
  if (!esValidoCIF(cif)) {
    return res.status(400).json({ mensaje: 'Formato de CIF inválido' });
  }

  //^ Validar el formato del número de teléfono
  if (!esTelefonoValido(telefono)) {
    return res.status(400).json({ mensaje: 'Formato de número de teléfono inválido' });
  }
  
  //^ Guardar los datos de la empresa en la base de datos 
  Empresa.query().insert({
  nombre,
  email,
  unsecurePassword: password,
  cif,
  puerto,
  telefono: Number(telefono),
  responsable,
  euros: Number(euros)
  }).then(results => res.status(200).json({status: "Ok"})).catch(err => {res.status(500).json({error: err}); console.log(err)});
});

app.get('/empresas',(req,res)=>{
  if(!!req.user){
    if(req.user.rol === "admin"){
        Empresa.query().then(resultado => res.json(resultado)).catch(err=> res.status(500).json({error:err}));
    }else{
      res.status(401).json({error:'No autorizado'});
    }
  }else{
    res.status(401).json({error:'No autenticado'});
  }
});

app.get('/empresasSinValidar',(req,res)=>{
  if(!!req.user){
    if(req.user.rol === "admin"){
        Empresa.query().where({verificado:false}).then(resultado => res.json(resultado)).catch(err=> res.status(500).json({error:err}));
    }else{
      res.status(401).json({error:'No autorizado'});
    }
  }else{
    res.status(401).json({error:'No autenticado'});
  }
});

app.post('/validarEmpresa',(req,res)=>{
  if(!!req.user){
    if(req.user.rol === "admin"){
        Empresa.query().patch({verificado : true}).findById(req.body.id).then(resultado => res.json(resultado)).catch(err=> res.status(500).json({error:err}));
    }else{
      res.status(401).json({error:'No autorizado'});
    }
  }else{
    res.status(401).json({error:'No autenticado'});
  }
});


// TODO Endpoint: POST /BORRAR EMPRESA --> Ok ========================================================================================
app.post('/borrarEmpresa', (req, res) => {
  if(!!req.user){
    if(req.user.rol === "admin"){
    const empresaId = req.body.id;
    Empresa.query().deleteById(empresaId).then(results => res.status(200).json({status: "OK"})).catch(err => res.status(500).json({error: err}));
    }else{
      if(req.user.rol === 'empresa'){
        const empresaId = req.user.email;
        Empresa.query().deleteById(empresaId).then(results => {
        res.status(200).json({status: "OK"});}).catch(err => res.status(500).json({error: err}));
        }else{
        res.status(401).json({error:'No autorizado'});
        }
  }
  }else{
  res.status(401).json({error:'No autenticado'});
  }
  });


// TODO Endpoint: GET /LISTADO CRUCEROS POR EMPRESA --> Ok ===============================================================================
app.get('/crucerosPorEmpresa',  (req, res) => {
  if(!!req.user){
    if(req.user.rol === "empresa" && req.user.verificado){
      // Obtener los eventos disponibles (que no hayan pasado)
      const hoy = new Date();
      hoy.setDate(hoy.getDate()+2);
      const limite = hoy;

      Crucero.query().where('fecha','>',limite).where('empresa_email',req.user.email).then(r=>res.status(200).json(r)).catch((error)=>
      res.status(500).json({ error: error }))
  }else{
    res.status(401).json({error:'No autorizado'});
  }
  }else{
  res.status(401).json({error:'No autenticado'});
  }
    
});

// ! BORRADOR Endpoint: PUT ==================================================================================================================
app.put('/cruceros/:idCrucero', async (req, res) => {
  const idCrucero = req.params.idCrucero;
  const nuevosDatosCrucero = req.body;
  
  try {
    
    // Actualizar el crucero por su ID
    // Patch -> para actualizar los campos del crucero en la base de datos
    await Crucero.query().findById(idCrucero).patch(nuevosDatosCrucero);
    
    res.status(200).json({ status: 'OK' });
    
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la informacion del Crucero' });
  }
});
debugger;


// * ========================================================================================================================================= 
// * =====================================================================  CRUCERO ========================================================  
// * ========================================================================================================================================= 

// TODO Endpoint: POST /REGISTRAR CRUCERO --> Ok  ============================================================================================
app.post('/registrarCrucero', (req, res) => {
  if(!!req.user){
    if(req.user.rol === "empresa" && req.user.verificado){
      const { nombre, puerto, ubicacion, aforo, descripcion, fecha, hora, precio } = req.body;

      const empresa_email = req.user.email;

      //^ Validar que se proporcionen todos los campos requeridos 
      if (!nombre || !puerto || !ubicacion || !aforo || !descripcion || !fecha || !hora || !precio || !empresa_email ) {
        return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
      }

      //^ Guardar los datos del crucero en la base de datos 
      Crucero.query().insert({
        nombre,
        puerto,
        ubicacion,
        aforo: Number(aforo),
        precio: Number(precio),
        descripcion,
        fecha,
        hora,
        empresa_email
      }).then(results => res.status(200).json({status: "Ok"})).catch(err => {console.log(err); res.status(500).json({error: err})});
  }else{
    res.status(401).json({error:'No autorizado'});
  }
  }else{
  res.status(401).json({error:'No autenticado'});
  }
});

app.post('/modificarCrucero', (req, res) => {
    const id = req.body.id;
    const patch = req.body.patch;

    if (!!patch.aforo) patch.aforo=Number(patch.aforo)
    if (!!patch.precio) patch.precio=Number(patch.precio)

    //^ Validar que se proporcionen todos los campos requeridos 
    if (!id) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }

  if(!!req.user){
    if(req.user.rol === "empresa" && req.user.verificado){
      const cruceroId = req.body.id;
      Crucero.query().findById(cruceroId).then(r=> {
        if(r.empresa_email===req.user.email){
          //^ Guardar los datos del crucero en la base de datos 
          Crucero.query().patch(
            patch
          ).findById(id).then(results => res.status(200).json({status: "Ok"})).catch(err => {console.log(err); res.status(500).json({error: err})});
        }else{
          res.status(401).json({error:'No autorizado'});
        }
      }).catch(err => res.status(404).json({error:"No se ha encontrado el crucero"}));
  }else{
    res.status(401).json({error:'No autorizado'});
  }
  }else{
  res.status(401).json({error:'No autenticado'});
  }
});


// TODO Endpoint: POST /BORRAR CRUCERO --> Ok ========================================================================================
app.post('/borrarCrucero', 
(req, res) => {
  if(!!req.user){
    if(req.user.rol === "empresa" && req.user.verificado){
      const cruceroId = req.body.id;
      Crucero.query().findById(cruceroId).then(r=> {
        if(r.empresa_email===req.user.email){
          Crucero.query().deleteById(cruceroId).then(results => res.status(200).json({status: "OK"})).catch(err => res.status(500).json({error: err}));
        }else{
          res.status(401).json({error:'No autorizado'});
        }
      }).catch(err => res.status(404).json({error:"No se ha encontrado el crucero"}));
  }else{
    res.status(401).json({error:'No autorizado'});
  }
  }else{
  res.status(401).json({error:'No autenticado'});
  }
  });


// TODO  Endpoint: GET / LISTADO CRUCEROS QUE NO HAYAN PASADO DE FECHA =====================================================================
app.get('/crucerosDisponibles', (req, res) => {
    // Obtener los eventos disponibles (que no hayan pasado)
    const hoy = new Date();
    hoy.setDate(hoy.getDate()+2);
    const limite = hoy;

    Crucero.query().where('fecha','>',limite).then(r=>res.status(200).json(r)).catch(()=>
    res.status(500).json({ error: 'Error al obtener los eventos disponibles' }))
  }
);


// * ========================================================================================================================================= 
// * =======================================================================  COMPRA =========================================================  
// * ========================================================================================================================================= 

//! Endpoint para comprar billetes
app.post('/comprarBilletes', async (req, res) => {

  const datastr = CryptoES.AES.decrypt(req.body.encriptado,"secreto").toString(CryptoES.enc.Utf8);
  const data = JSON.parse(datastr);

  const { cruceroId, cantidadBilletes, datosTarjeta } = data;

  // Validar que se proporcionen todos los campos requeridos
  if (!cruceroId || !cantidadBilletes || !datosTarjeta) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  try {
    //^ Realizar verificaciones para el número de tarjeta, CVV y fecha de expiración
    if (!esValidoCard(datosTarjeta.cardNumber)) {
      return res.status(400).json({ mensaje: 'Número de tarjeta inválido' });
    }

    if (!esValidoCVV(datosTarjeta.cvv)) {
      return res.status(400).json({ mensaje: 'CVV inválido' });
    }

    if (!esValidoExpiracion(datosTarjeta.expiresOn)) {
      return res.status(400).json({ mensaje: 'Fecha de expiración inválida' });
    }

    //^ Verificar la disponibilidad de billetes para el crucero
    const crucero = await Crucero.query().findById(cruceroId);
    if (!crucero) {
      return res.status(400).json({ mensaje: 'El crucero no existe' });
    }

    if (crucero.aforo < cantidadBilletes) {
      return res.status(400).json({ mensaje: 'No hay suficientes billetes disponibles' });
    }

    const precio = crucero.precio * cantidadBilletes;

    const response = await axios.post('https://pse-payments-api.ecodium.dev/payment', {
      clientId: "0",
      paymentDetails:{
          creditCard:datosTarjeta,
          totalAmount: precio.toString()
          }
    });

    if(!!response.data.success){
      // Guardar la información de la compra en la base de datos
      const compra = {
        cruceroid:cruceroId,
        cantidadbilletes:cantidadBilletes,
        cardnumber:datosTarjeta.cardNumber,
        cvv:datosTarjeta.cvv,
        expireson:datosTarjeta.expiresOn,
      };

      await Compra.query().insert(compra);
      crucero.aforo -= cantidadBilletes;
      await crucero.$query().patch({aforo:crucero.aforo});
      
      // Enviar una respuesta exitosa al cliente
      res.status(200).json(response.data);
    }
  else{
      done({status:400, error: response.data.errors})
  }
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de compra
    console.log(error);
    res.status(500).json({ mensaje: 'Error al realizar la compra de los billetes' });
  }
});


// Parámetros
  app.get('/crucero/:id', async (req, res) => {
    const cruceroId = req.params.id; 
    try {
        // Recuperar los detalles del crucero de la base de datos     
        const crucero = await Crucero.query().findById(cruceroId);
      res.status(200).json(crucero);
    } catch (error) {
      console.error('Error al obtener los detalles del crucero:', error);
      res.status(500).json({ mensaje: 'Error al obtener los detalles del crucero' });
    }
  });
  

  
  

//^ Definimos el puerto 8080 
app.listen(8080,() => {
    console.log(`Servidor escuchando en el puerto 8080`);
});

