import { UsuarioModel } from "./usuario.model.js";

async function createUserAction(correo, contraseña, permisos) {
    const user = await UsuarioModel.create({ correo, contraseña, permisos });
    return user;
}
export { createUserAction };