import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db_parcial', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;
