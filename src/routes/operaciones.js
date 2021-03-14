const express = require('express');
const conexion = require('../db/conexion');
const router = express.Router();


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
        query = "INSERT INTO operaciones (monto, concepto, fecha, tipo) VALUES (?, ?, ?,?)";
        respuesta = await conexion.query(query, [monto, concepto.toUpperCase(), fecha, tipo]);
                
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
             //verificar si existe el libro
            //  let query = "SELECT * FROM libro WHERE id = ?";
            //  let respuesta = await conexion.query(query, [id]);
            //  console.log(respuesta.length);
    
            //  if (respuesta.length == 0) {
            //      throw new Error("No se encuentra ese libro");
            //  }
    
            //  verificar si está prestado
            //  query = "SELECT persona_id FROM libro WHERE id = ? AND persona_id IS NULL";
            //  respuesta = await conexion.query(query, [id]);
    
            //  if (respuesta.length == 0) {
            //      throw new Error("Ese libro está prestado, no se puede borrar");
            //  }
    
            //  si no está prestado, borrar
             let query = 'DELETE FROM operaciones WHERE id = ?';
             let respuesta = await conexion.query(query, [id]);
    
             res.status(200).send({ "respuesta": "Operación eliminada correctamente" });
    
             console.log(respuesta);
    
         } catch (error) {
             res.status(413).send({ "Error": error.message });
         }
     });

//  router.put("/libro/prestar/:id" , async (req, res)=>{ //Para modificar el campo persona_id para prestar libro
//     const {persona_id} = req.body;
//     const {id} = req.params;
//     try{
//         let query = "UPDATE libro SET persona_id = ? WHERE id = ?";
//         let respuesta = await conexion.query(query, [persona_id, id]);
 
//          query = "SELECT * FROM libro WHERE id = ?";
//          respuesta = await conexion.query(query, [id]);
//          res.status(200).send({"response" : respuesta});
//         }
//         catch(error){
//             res.status(413).send({"Error" : error.message});
//         }

//  });



   
// router.get('/operaciones/:id', async (req,res) => {
//     const {id} = req.params;
//   try {
//       const query = 'SELECT * FROM operaciones WHERE id = ?';
//       const respuesta = await conexion.query(query, [id]);
      
//       if(respuesta.length == 0){
//         throw new Error("Ese libro no se esta en inventario");
//         }

//       res.status(200).send({"respuesta" : respuesta});
//   } catch (error) {
//       res.status(413).send({"Error" : error.message});
//   }
// });



//  router.put("/libro/devolver/:id" , async (req, res)=>{ 
  
//     const {id} = req.params;
//     try{
//         let query = "SELECT * FROM libro WHERE id = ?";
//         let respuesta = await conexion.query(query, [id]);
               
//         if(respuesta.length == 0){
//             throw new Error("Ese libro no existe");
//         }

//          query = "SELECT persona_id FROM libro WHERE id = ? AND persona_id IS NOT NULL";
//          respuesta = await conexion.query(query, [id]);
               
//         if(respuesta.length == 0){
//             throw new Error("Ese libro no esta prestado");
//         }
        
//         query = "UPDATE libro SET persona_id = NULL WHERE id = ?";
//         respuesta = await conexion.query(query, [id]);

//         query = "SELECT * FROM libro WHERE id = ?";
//         respuesta = await conexion.query(query, [id]);
//         res.status(200).send({"El libro fue devuelto correctamente" : respuesta});
       
//        }
//        catch(error){
//            res.status(413).send({"Error" : error.message});
//        }
// });

// 

// function isEmpty(str){
//     return (!str || 0 == str.length);
// }

module.exports = router;