/*
Despliegue de la aplicación
*/

require('dotenv').config();

const app = require('./app');
const db = require('./models');
const PORT = process.env.PORT || 3000;

const iniciarServidor = async() => {
    try {
        await db.sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');
        await db.sequelize.sync({alter: true});
        console.log('Modelos sincronizados correctamente.');

        app.listen(PORT, ()=> {
            console.log(`Servidor funcionando en el puerto: ${PORT}`);
        });

    } catch(error) {
        console.log('Error al iniciar el servidor.', error.message);
    }
};

iniciarServidor();
