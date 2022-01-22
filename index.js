require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config.js');
const cors = require('cors');

// iniciar servidor
const app = express();
app.use(cors());

// BAse de datos
dbConnection();

// Rutas
app.get('/', (req,res) => {
    res.json({
        ok: true,
        msg: 'hola mundo'
    })
})
// mean_user
// ztaPV37NRwZPKVq7



app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
});


console.log('Hola mundo');