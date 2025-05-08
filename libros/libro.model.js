import mongoose from 'mongoose'; 
const Schema = mongoose.Schema;

const Libro = new Schema({
    reservado_por: {type: Schema.Types.ObjectId, ref: 'Usuario', default: null},
    titulo: String,
    autor: String,
    editorial: String,
    fecha_pub: Date,
    genero: String,
    inhabilitado: {type: Boolean, default: false},
    historialReservas: [{
        usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
        fecha_reserva: Date,
        fecha_devolucion: {type: Date, default: null},
    }],
})
export const LibroModel = mongoose.model('Libro', Libro);