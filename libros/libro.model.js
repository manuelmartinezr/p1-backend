import mongoose from 'mongoose'; 
const Schema = mongoose.Schema;

const Libro = new Schema({
    reservadoPor: {type: Schema.Types.ObjectId, ref: 'Usuario', default: null},
    titulo: String,
    autor: String,
    editorial: String,
    fechaPublicacion: Date,
    genero: String,
    inhabilitado: {type: Boolean, default: false},
    historialReservas: [{
        usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
        fechaReserva: Date,
        fechaDevolucion: {type: Date, default: null},
    }],
})
export const LibroModel = mongoose.model('Libro', Libro);