import { LibroModel } from './libro.model.js';

async function deleteLibroAction(id) {
    const libro = await LibroModel.findByIdAndUpdate(id, { inhabilitado: true }, { new: true });
    return libro;
}
export { deleteLibroAction };