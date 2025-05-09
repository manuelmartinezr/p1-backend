import { UsuarioModel } from "./usuario.model.js";

async function updateUserAction(id, updates) {
    const user = await UsuarioModel.findByIdAndUpdate(id, updates, { new: true });
    return user;
}
export { updateUserAction };