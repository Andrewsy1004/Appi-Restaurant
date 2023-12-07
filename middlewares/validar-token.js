import Jwt from 'jsonwebtoken';
import UsuarioModelo from '../models/usuario.js';

export const ValidarJwt = async(req, res, next) => {
    const token = req.header('Authorization');
    
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
         const {uid} = Jwt.verify(token, process.env.SECRETORPRIVATEKEY);
         const usuario = await UsuarioModelo.findById(uid);
         
         if(!usuario){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido - usuario no existe en DB'
            });
         }

         if(!usuario.estado){
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido - usuario con estado false'
            });
         }

         req.usuario = usuario;
         next();
         
    }catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}
