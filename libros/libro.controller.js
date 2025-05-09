import { readLibroAction } from './read.libro.action.js';
import { createLibroAction } from './create.libro.action.js';
import { updateLibroAction } from './update.libro.action.js';
import { deleteLibroAction } from './delete.libro.action.js';
import { LibroModel } from './libro.model.js';

// lógica
async function readOneController(id, incluir_reservados, incluir_deshabilitados) {
    const libro = await LibroModel.findById(id);
    if (!libro) throw new Error('Libro no encontrado');
    if (libro.inhabilitado && !incluir_deshabilitados)
      throw new Error('Libro inhabilitado');
    if (libro.reservado_por && !incluir_reservados)
      throw new Error('Libro reservado');
    return libro;
}
async function readListController(filters, incluir_reservados, incluir_deshabilitados) {
    const {titulo, autor, editorial, desde, hasta, genero} = filters;
    const libros = await readLibroAction(
        null,
        titulo,
        autor,
        editorial,
        desde,
        hasta,
        genero,
        incluir_reservados,
        incluir_deshabilitados
    );
    if (!libros) throw new Error('Libros no encontrados');
    return libros;
}
async function createController(titulo, autor, editorial, fecha_pub, genero) {
    const libro = await createLibroAction(
        titulo,
        autor,
        editorial,
        fecha_pub,
        genero
    );
    if (!libro) throw new Error('Error al crear el libro');
    return libro;
}
async function updateController(id, updates) {
    const {inhabilitado, ...resto} = updates;
    const libro = await updateLibroAction(id, resto);
    if (!libro) throw new Error('Error al actualizar el libro');
    return libro;
}
async function deleteController(id) {
    const libro = await deleteLibroAction(id);
    if (!libro) throw new Error('Error al eliminar el libro');
    return libro;
}

export { readOneController, readListController, createController, updateController, deleteController };