import { LibroModel } from "./libro.model.js";

async function updateLibroAction(id, updates) {
    const libro = await LibroModel.findByIdAndUpdate(id, updates, {new: true});
    return libro
}
export { updateLibroAction };