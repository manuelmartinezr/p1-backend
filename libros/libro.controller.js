import { readLibroAction } from './read.libro.action.js';
import { createLibroAction } from './create.libro.action.js';
import { updateLibroAction } from './update.libro.action.js';
import { deleteLibroAction } from './delete.libro.action.js';

// lógica
async function readController(arg, incluir_reservados, incluir_deshabilitados) {
    if (typeof arg === "object" && arg !== null) {
        const { titulo, autor, editorial, desde, hasta, genero } = arg;
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
        if (!libros) throw new Error("Libros no encontrados");
        return libros;
    } else {
        // arg es un ID
        const libros = await readLibroAction(arg, incluir_reservados, incluir_deshabilitados);
        if (!libros) throw new Error("Libros no encontrados");
        return libros;
    }
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

export { readController, createController, updateController, deleteController };