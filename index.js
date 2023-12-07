import Express from 'express';
import cors from 'cors';
import {dbConnection} from './database/config.js';
import UsuarioRoutes from './routes/usuario-routes.js';
import userAuth from './routes/auth-routes.js';
import compras from './routes/compras-routes.js';
import 'dotenv/config';

const app = Express();
const PORT = process.env.PORT || 3000;

dbConnection();

app.use(cors());
app.use(Express.json());

app.use('/api/usuarios', UsuarioRoutes);
app.use('/api/auth', userAuth);
app.use('/api/compras', compras);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
