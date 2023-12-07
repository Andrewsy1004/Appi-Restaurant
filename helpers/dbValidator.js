import UsuarioModelo from '../models/usuario.js';

export const emailExiste = async (correo = "") => {
    const existe = await UsuarioModelo.findOne({correo});
    if(existe){
      throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

export const existePorId = async (id) => {
  const existe = await UsuarioModelo.findById(id);
  if(!existe){
    throw new Error(`El id ${id} no existe`);
  }
}