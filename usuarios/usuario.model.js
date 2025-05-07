import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Usuario = new Schema({
    correo : String,
    contraseña: String,
    permisos: {
        crearLibros: Boolean,
        editarUsuarios: Boolean,
        editarLibros: Boolean,
        inhabilitarUsuarios: Boolean,
        inhabilitarLibros: Boolean,
    },
    inhabilitado: {type: Boolean, default: false},
    historialReservas: [{
        libro: {type: Schema.Types.ObjectId, ref: 'Libro'},
        fechaReserva: Date,
        fechaDevolucion: {type: Date, default: null},
    }],
})
export const UsuarioModel = mongoose.model('Usuario', Usuario);