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

// Dashboard
router.get("/heroes", obtenerTodosLosSuperheroesController);

// Formulario agregar
router.get("/heroes/agregar", mostrarFormularioAgregarController);
router.post("/heroes", agregarSuperheroeController);

// Editar
router.get("/heroes/:id/editar", editarSuperheroeController);
router.put("/heroes/:id", actualizarSuperheroeController);

// Borrar
router.delete("/heroes/:id", borrarSuperheroeController);

export default router;
