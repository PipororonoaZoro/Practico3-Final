import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema(
{
    nombreSuperHeroe: 
    {   
        type: String, 
        required:true,
        trim: true,
        minlength: 3,
        maxlength: 60 
    },
    nombreReal: 
    { 
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 60 
    },
    edad: 
    {   type: Number,
        required: true,
        min: 0 
    },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: 
    {   
        type: [String],
        required: true,
        validate: { validator: function(arr) {return arr.length > 0 && arr.every(p => p.trim().length >= 3 && p.trim().length <= 60)}, message: 'Cada poder debe tener entre 3 y 60 caracteres' }
    },
    aliados: [String],
    enemigos: [String],
    creador: String,
    createdAt: { type: Date, default: Date.now }
});
const superHero = mongoose.model('SuperHero', superheroSchema, 'Grupo-14');
export default superHero