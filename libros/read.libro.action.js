import { LibroModel } from './libro.model.js';

async function readLibroAction(id, titulo, autor, editorial, desde, hasta, genero, incluir_reservados, incluir_deshabilitados) {
    const query = {};
    if (id) {
        query._id = id;
    }
    if (titulo) {
        query.titulo = { $regex: titulo, $options: 'i' };
    }
    if (autor) {
        query.autor = { $regex: autor, $options: 'i' };
    }
    if (editorial) {
        query.editorial = { $regex: editorial, $options: 'i' };
    }
    if (desde && hasta) {
        query.fecha_pub = { $gte: desde, $lte: hasta };
    } else if (desde) {
        query.fecha_pub = { $gte: desde };
    } else if (hasta) {
        query.fecha_pub = { $lte: hasta };
    }
    if (genero) {
        query.genero = { $regex: genero, $options: 'i' };
    }
    if (!incluir_deshabilitados) {
        query.inhabilitado = false;
    }
    if (!incluir_reservados) {
        query.reservado_por = null;
    }
    
    const libros = await LibroModel.find(query);

    return libros;
}
export { readLibroAction };