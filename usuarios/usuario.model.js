import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Usuario = new Schema({
    correo : String,
    contraseña: String,
    permisos: {
        crear_libros: Boolean,
        editar_usuarios: Boolean,
        editar_libros: Boolean,
        inhabilitar_usuarios: Boolean,
        inhabilitar_libros: Boolean,
    },
    inhabilitado: {type: Boolean, default: false},
    historial_reservas: [{
        libro: {type: Schema.Types.ObjectId, ref: 'Libro'},
        fecha_reserva: Date,
        fecha_devolucion: {type: Date, default: null},
    }],
})
export const UsuarioModel = mongoose.model('Usuario', Usuario);