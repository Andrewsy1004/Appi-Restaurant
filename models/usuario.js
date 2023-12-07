import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo : {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
    },
    password : {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        unique: true,
    },
    estado : {
        type: Boolean,
        default: true,
    },
})

usuarioSchema.methods.toJSON = function (){
    const { __v,password, _id , ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

const UsuarioModelo = mongoose.model('Usuario', usuarioSchema);
export default UsuarioModelo;