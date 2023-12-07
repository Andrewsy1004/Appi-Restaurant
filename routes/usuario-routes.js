import { Router } from 'express';
import { check } from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js'
import {emailExiste,existePorId} from '../helpers/dbValidator.js'
import {usuarioPost,usuariosGet,usuarioDelete,usuarioPut} from '../controllers/usuario-controller.js'


const router = Router();

router.post('/',[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe ser mas de 6 caracteres").isLength({min: 6}),
    check("correo", "Esto no es un correo").isEmail(),
    check("correo").custom(emailExiste),
    validarCampos
], usuarioPost)

router.get('/',usuariosGet)

router.delete('/:correo',[
    check("correo", "Esto no es un correo").isEmail(),
    validarCampos
],usuarioDelete)

router.put('/:id', [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existePorId),
    validarCampos
],usuarioPut)

export default router