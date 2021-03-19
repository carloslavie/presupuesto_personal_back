const express = require('express');
const conexion = require('../db/conexion');
const router = express.Router();
const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const bcrypt= require('bcrypt');
const { response } = require('express');

router.use(express.json());

// //autenticacion
// const auth = (req, res, next)=>{
//     try {
//         let token = req.headers["Authorization"];
//         console.log("esto es el token header", token)
//         if(!token){
//             throw new Error("No te encuentras logueado")
//         }
//         token = token.replace("Bearer ", "");
//         jwt.verify(token, "secret", (err, user)=>{
//             if(err){
//                 throw new Error("Token invalido")
//             }
//         });
//         next();
//     } 
//     catch (e) {
//         res.status(403).send({message : e.message})
//     }
// }

//  auth.unless = unless;
//  router.use(auth.unless({
//      path:[
//          {url:'/login', methods : ['POST']},
//          {url:'/registro', methods : ['POST']}
//      ]
//  }));

// //REGISTRO

// router.post("/registro", async (req, res) =>{
//     try{
//         const { nombre, apellido, email, clave } = req.body;
        
//         if(!nombre || !apellido || !clave || !email){
//             throw new Error("No complestaste los campos");
//         }

//         let query = "SELECT * FROM usuarios WHERE email = ?";
//         let respuesta = await conexion.query(query, [email]);

//         if(respuesta.length > 0){
//             throw new Error("Ese email ya se encuentra registrado");
//         }

//         const claveEncriptada = await bcrypt.hash(clave, 10);


//         query = "INSERT INTO usuarios (nombre, apellido, email, clave) VALUES (?,?,?,?)";
//         respuesta = await conexion.query(query, [nombre, apellido, email, claveEncriptada]);

//         res.status(200).send({message : "Se registro correctamente"});
//     }
//     catch(e){
//         res.status(413).send({message : e.message})
//     }
// });

// //LOGIN

// router.post("/login" , async (req,res)=>{

//     const {usuario, clave } = req.body;

//     try {
//          if(!usuario || !clave){
//              throw new Error("No completaste los campos");
//          }

//         let query =  "SELECT * FROM usuarios WHERE email = ?";
//         let respuesta = await conexion.query(query, [usuario]);

//          if(respuesta.length == 0){
//              throw new Error ("El usuario no se encuentra registrado");
//          }

//         console.log(respuesta[0].clave);
//         const claveEncriptada = respuesta[0].clave;

//         if(!bcrypt.compareSync(clave, claveEncriptada)){
//             throw new Error ("clave incorrecta");
//         }
//         const tokenData = {
//             nombre: respuesta[0].nombre,
//             apellido: respuesta[0].apellido,
//             id: respuesta[0].id
//         }
 
//         const token = jwt.sign(tokenData, "secret", {
//             expiresIn: 60*60*24
//         })
//         console.log("esto est token",token);
//         res.status(200).send({token})
       
//     } 
//     catch (e) {
//         res.status(413).send({message : e.message});
//     }
// });


//Inresar operacion
router.post("/operaciones", async (req, res) => {
    const {monto, concepto, tipo} = req.body;
    try{
        // //valido que me envie correctamente la info
        // if(isEmpty(monto)||isEmpty(concepto)||isEmpty(fecha)||isEmpty(tipo)){
        //     throw new Error("Los campos son obligatorios");
        //    }        
        const fecha = new Date();
        console.log(fecha);                          
        let query = "INSERT INTO operaciones (monto, concepto, fecha, tipo) VALUES (?, ?, ?,?)";
        let respuesta = await conexion.query(query, [monto, concepto.toUpperCase(), fecha, tipo]);
                
        res.status(200).send({"respuesta" : respuesta});
    
        }
        catch(error){
            res.status(413).send({"Error" : error.message});
        }
        });

//Obtener todas las operaciones
router.get("/operaciones", async (req,res) => {
    try {
        const query = 'SELECT * FROM operaciones';
        const respuesta = await conexion.query(query);
        res.status(200).send({"respuesta" : respuesta});
    } catch (error) {
        res.status(413).send({"error": error.message});
        
    }
});

//Obtener solo egresos
router.get("/operaciones/egresos", async (req,res) => {
    try {        
        const query = 'SELECT * FROM operaciones WHERE tipo = "egreso"';
        const respuesta = await conexion.query(query);
        res.status(200).send({"respuesta" : respuesta});
    } catch (error) {
        res.status(413).send({"error": error.message});
        
    }
});

//Obtener solo ingresos
router.get("/operaciones/ingresos", async (req,res) => {
    try {        
        const query = 'SELECT * FROM operaciones WHERE tipo = "ingreso"';
        const respuesta = await conexion.query(query);
        res.status(200).send({"respuesta" : respuesta});
    } catch (error) {
        res.status(413).send({"error": error.message});
        
    }
});


//Modificar concepto y monto de una operacion
 router.put("/operaciones/:id" , async (req, res)=>{ 
    const {concepto, monto } = req.body;
    const {id} = req.params;
     try{
        //  if(isEmpty(nombre) ||isEmpty(categoria_id) ){
        //      throw new Error("No completaste los campos obligatorios");
        //  }
 
        //  let query = "SELECT * FROM libro WHERE nombre = ? AND categoria_id = ? AND id = ?";
        //  let respuesta = await conexion.query(query, [nombre, categoria_id, id]);

          let query = "UPDATE operaciones SET concepto = ?, monto = ? WHERE id = ?";
          let respuesta = await conexion.query(query, [concepto.toUpperCase(), monto, id]);
 
          query = "SELECT * FROM operaciones WHERE id = ?";
          respuesta = await conexion.query(query, [id]);
          res.status(200).send({"MODIFICADO" : respuesta});
         }
         catch(error){
          
             res.status(413).send({"Error" : error.message});
         }
  });

  //Eliminar operacion
  router.delete('/operaciones/:id', async(req, res) => {
         const { id } = req.params;
         //const { persona_id } = req.body;
    
         try {
             
             let query = 'DELETE FROM operaciones WHERE id = ?';
             let respuesta = await conexion.query(query, [id]);
    
             res.status(200).send({ "respuesta": "Operación eliminada correctamente" });
    
             console.log(respuesta);
    
         } catch (error) {
             res.status(413).send({ "Error": error.message });
         }
     });


module.exports = router;