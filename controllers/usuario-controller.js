import UsuarioModelo from '../models/usuario.js';
import bcrypt from 'bcryptjs';

export const usuarioPost = async(req, res) => {
    const {nombre, correo, password}  = req.body;
    const Usuario = new UsuarioModelo({nombre, correo, password}); 

    const salt = bcrypt.genSaltSync();
    Usuario.password = bcrypt.hashSync(password, salt);

    await Usuario.save();
    
    res.status(200).json({
        ok: true,
        Usuario        
    })
}


export const usuariosGet = async(req, res) => {
    const {limit=3 , desde=0} = req.query; 

    const [total, usuarios] = await Promise.all([
        UsuarioModelo.countDocuments({estado: true}),
        UsuarioModelo.find({estado: true})
          .skip(Number(desde))
          .limit(Number(limit)),
    ])

   res.status(200).json({
       total,
       usuarios 
   });
};

export const usuarioDelete = async (req, res) => {
    const { correo } = req.params;
    const usuario = await UsuarioModelo.findOneAndUpdate({ correo }, { estado: false }, { new: true });
    res.status(200).json({
        ok: true,
        usuario
    });
};

export const usuarioPut = async (req, res) => {
    const {id}  = req.params;
    
    const { password,...resto } = req.body;

    if(password){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }
    
    const usuario = await UsuarioModelo.findByIdAndUpdate(id, resto);

    res.status(200).json({
        ok: true,
        usuario
    })
}