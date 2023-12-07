import mongoose from 'mongoose';

const compraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    cantidad : {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
    },
    precio : {
        type: Number,
        required: [true, 'El precio es obligatoria'],
    },
    total : {
        type: Number,
        required: [true, 'El total es obligatoria'],
    },
    estado : {
        type: Boolean,
        default: true,
    },
    usuario : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})

const ComprasModelo = mongoose.model('Compras', compraSchema);
export default ComprasModelo;