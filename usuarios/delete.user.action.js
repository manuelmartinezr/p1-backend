import { UsuarioModel } from './usuario.model.js';

async function deleteUserAction(id) {
    const user = await UsuarioModel.findByIdAndUpdate(id, { inhabilitado: true }, { new: true });
    return user;
}
export { deleteUserAction };