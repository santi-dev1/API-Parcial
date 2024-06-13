import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productoRoutes from './routes/productoRoutes.js';
import sequelize from './config/database.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', productoRoutes);

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Se establecio correctamente la conexion con la base de datos');
        console.log(`El servidor esta corriendo el puerto ${port}`);
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
});
