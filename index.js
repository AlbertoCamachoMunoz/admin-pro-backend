require('dotenv').config();

const express = require('express');
const { dbConnection } = require('./database/config.js');
const cors = require('cors');

// Iniciar servidor
const app = express();

// Configurar Cors
app.use(cors());

// Lectura y parseo del body colocar antes de las rutas
app.use( express.json());

// Base de datos
dbConnection();

// rutas
app.use('/api/usuarios', require('./routes/usuarios'));



// mean_user
// ztaPV37NRwZPKVq7



app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
});


console.log('Hola mundo');