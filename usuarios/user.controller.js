// lógica
import { readUserAction} from './read.user.action.js';
import { createUserAction } from './create.user.action.js';

async function readController(correo, contraseña) {
    const user = await readUserAction(correo, contraseña);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    if (user.inhabilitado) {
        throw new Error('Usuario inhabilitado');
    }
    return user;
}

async function registerController(correo, contraseña, permisos) {
    const user = await createUserAction(correo, contraseña, permisos);
    if (!user) {
        throw new Error('Error al registrar el usuario');
    }
    return user;
}

export { readController, registerController };