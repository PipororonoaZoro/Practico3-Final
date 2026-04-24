import express from "express";
import {
  obtenerTodosLosSuperheroesController,
  mostrarFormularioAgregarController,
  agregarSuperheroeController,
  editarSuperheroeController,
  actualizarSuperheroeController,
  borrarSuperheroeController
} from "../controllers/superheroesController.mjs";

const router = express.Router();

// Ruta: listar todos los héroes
router.get("/heroes", obtenerTodosLosSuperheroesController);

// Ruta: mostrar formulario de agregar
router.get("/heroes/agregar", mostrarFormularioAgregarController);

// Ruta: agregar héroe
router.post("/heroes/agregar", agregarSuperheroeController);

// Ruta: mostrar formulario de edición
router.get("/heroes/:id/editar", editarSuperheroeController);

// Ruta: actualizar héroe
router.put("/heroes/:id", actualizarSuperheroeController);

// Ruta: borrar héroe
router.delete("/heroes/:id", borrarSuperheroeController);

export default router;
