import { UsuarioModel } from "./usuario.model.js";
// query
async function readUserAction(correo, contraseña) {
    const user = await UsuarioModel.findOne({ correo: correo, contraseña: contraseña });
    return user;
}
export { readUserAction };