import mongoose from "mongoose";

const superheroSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del superhéroe es obligatorio"],
    trim: true,
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [60, "El nombre no puede superar los 60 caracteres"]
  },
  nombreReal: {
    type: String,
    required: [true, "El nombre real es obligatorio"],
    trim: true,
    minlength: [3, "El nombre real debe tener al menos 3 caracteres"],
    maxlength: [60, "El nombre real no puede superar los 60 caracteres"]
  },
  edad: {
    type: Number,
    required: [true, "La edad es obligatoria"],
    min: [0, "La edad no puede ser negativa"]
  },
  planeta: { type: String, default: "Desconocido" },
  poderes: {
    type: [String],
    required: [true, "Debe tener al menos un poder"],
    validate: {
      validator: function (arr) {
        return (
          arr.length > 0 &&
          arr.every((p) => p.trim().length >= 3 && p.trim().length <= 60)
        );
      },
      message: "Cada poder debe tener entre 3 y 60 caracteres"
    }
  },
  aliados: [String],
  enemigos: [String],
  creador: String,
  createdAt: { type: Date, default: Date.now }
});

const SuperHero = mongoose.model("SuperHero", superheroSchema, "Grupo-14");
export default SuperHero;
