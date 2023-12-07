import ComprasModelo from '../models/compra.js';

export const CrearCategoria = async(req, res) => {
    try {
        const { usuario, ...body} = req.body;

        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        };
    
        const producto = new ComprasModelo(data);
        await producto.save();
    
        res.json({
            msg: 'Producto creado',
            producto: producto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al procesar la solicitud' });
    }    
}

export const obtenerCompras = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, compras] = await Promise.all([
            ComprasModelo.countDocuments(query),
            ComprasModelo.find(query, { estado: true })
                .populate('usuario', 'nombre')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.json({
            total,
            compras 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las categorías' });
        Producto   }
};

export const obtenerCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await ComprasModelo.findById(id, { estado: true })
            .populate('usuario', 'nombre')
        
         if(producto!==null){
            res.json(producto);
         }else{
            res.status(404).json({ msg: 'El cliente no existe en la bd' });
         }  
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener la categoría' });
    }

}

export const borrarCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await ComprasModelo.findByIdAndUpdate(id, { estado: false }, { new: true });
        res.json({
            producto
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al borrar la categoría' });
    }
}

export const actualizarCompra = async (req, res) => {
    try{
       const { id } = req.params;
       const { estado, usuario, ...data } = req.body;
    
       data.usuario = req.usuario._id;

       const producto = await ComprasModelo.findByIdAndUpdate(id, data, { new: true });

       res.json({
         producto
       })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al actualizar la categoría', error });
    }
}