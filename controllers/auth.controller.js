import UsuarioModelo from '../models/usuario.js'
import bcrypt from 'bcryptjs'
import { GenerateToken } from '../helpers/generateToken.js'

export const Autentificacion = async(req, res) => {
    const {correo, password} = req.body

    try{

        const user = await UsuarioModelo.findOne({correo})
        if(!user){
            return res.status(400).json({
                ok: false,
                message: 'User not found '
            })
        }
        
        if(user.estado === false){
            return res.status(400).json({
                ok: false,
                message: 'User not active '
            })
        }

        const Vpassword = bcrypt.compareSync(password, user.password);
        if(!Vpassword){
            return res.status(400).json({
                ok: false,
                message: 'Password incorrect '
            })
        }
        
        const token = await GenerateToken( user._id );

        res.status(200).json({
            user,
            token
        })
    }catch (error) {
       console.log(error)
       return res.status(500).json({
           ok: false,
           message: 'Error'
       })
    }
}