import { LibroModel } from './libro.model.js';

async function createLibroAction(titulo, autor, editorial, fecha_pub, genero) {
    const libro = new LibroModel({
        titulo,
        autor,
        editorial,
        fecha_pub,
        genero
    });
    await libro.save();
    return libro;
}
export { createLibroAction };