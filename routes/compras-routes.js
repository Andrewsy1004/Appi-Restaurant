import { Router } from 'express';
import { check } from 'express-validator';
import {validarCampos} from '../middlewares/validarCampos.js'
import {ValidarJwt} from '../middlewares/validar-token.js'
import {CrearCategoria,obtenerCompras,obtenerCompra,borrarCompra,actualizarCompra} from '../controllers/compras-controller.js'

const router = Router();


router.post('/',[
    ValidarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("cantidad", "La cantidad es obligatoria").not().isEmpty(),
    check("precio", "El precio es obligatoria").not().isEmpty(),
    check("total", "El total es obligatoria").not().isEmpty(),
    validarCampos
], CrearCategoria)


router.get('/', obtenerCompras)

router.get('/:id',[
    ValidarJwt,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos
],obtenerCompra)


router.delete('/:id',[
    ValidarJwt,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos
], borrarCompra);

router.put('/:id',[
    ValidarJwt,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos
],actualizarCompra);


export default router