const express = require('express');
const conexion = require('../db/conexion');
const router = express.Router();


//Inresar operacion
router.post("/operaciones", async (req, res) => {
    const {monto, concepto, tipo} = req.body;
    try{
              
        const fecha = new Date();                                
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
        const query = 'SELECT * FROM operaciones ORDER BY id DESC';
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
             
         try {
             
             let query = 'DELETE FROM operaciones WHERE id = ?';
             let respuesta = await conexion.query(query, [id]);
    
             res.status(200).send({ "respuesta": "Operación eliminada correctamente" });               
    
         } catch (error) {
             res.status(413).send({ "Error": error.message });
         }
     });

module.exports = router;