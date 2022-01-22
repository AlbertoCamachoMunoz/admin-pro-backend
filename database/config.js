const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DDBB conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BBDD');
    }

}

module.exports = {
    dbConnection
}