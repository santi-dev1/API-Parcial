import sequelize from './config/database.js';
import Producto from './models/Producto.js';

const syncDb = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Base sincronizada');
    } catch (error) {
        console.error('No se pudo sincronizar:');
    }
};

syncDb();
