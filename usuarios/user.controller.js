// lógica
import { readUserAction} from './read.user.action.js';
import { createUserAction } from './create.user.action.js';
import { updateUserAction } from './update.user.action.js';
import { deleteUserAction } from './delete.user.action.js';
import jwt from 'jsonwebtoken';

async function readController(correo, contraseña) {
    const user = await readUserAction(correo, contraseña);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    if (user.inhabilitado) {
        throw new Error('Usuario inhabilitado');
    }

    const payload = {
        id: user._id,
        correo: user.correo,
        permisos: {
            crear_libros:   user.permisos.crear_libros,
            editar_usuarios: user.permisos.editar_usuarios,
            editar_libros:  user.permisos.editar_libros,
            inhabilitar_usuarios: user.permisos.inhabilitar_usuarios,
            inhabilitar_libros: user.permisos.inhabilitar_libros
        }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    return token;
}

async function createController(correo, contraseña, permisos) {
    const user = await createUserAction(correo, contraseña, permisos);
    if (!user) {
        throw new Error('Error al registrar el usuario');
    }
    return user;
}

async function updateController(id, updates) {
    const {inhabilitado, ...resto} = updates;
    const user = await updateUserAction(id, resto);
    if (!user) {
        throw new Error('Error al actualizar el usuario');
    }
    return user;
}
async function deleteController(id) {
    const user = await deleteUserAction(id);
    if (!user) {
        throw new Error('Error al eliminar el usuario');
    }
    return user;
}

export { readController, createController, updateController, deleteController};