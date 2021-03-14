const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
//routes
app.use(require('./src/routes'));
app.use(require('./src/routes/operaciones'));



app.listen(port, () => {
    console.log(`estoy escuchando en el puerto ${port}`);
})
