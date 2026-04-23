import express from 'express';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  crearSuperheroeController,
  actualizarSuperheroeController,
  borrarSuperheroePorIdController,
  borrarSuperheroePorNombreController,
  editarSuperheroeController,
  agregarSuperheroeController,
  renderizarFormularioEditarController,
  eliminarSuperheroeController
} from '../controllers/superheroesController.mjs';
const router = express.Router();

// ⚠️ IMPORTANTE: Las rutas específicas DEBEN ir antes que las rutas con parámetros (:id)

// Rutas estáticas y específicas primero
router.get('/heroes/agregar', (req, res) => res.render('addSuperhero')); // muestra el formulario
router.post('/heroes/agregar', agregarSuperheroeController); // procesa la creación desde formulario
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller); // obtiene mayores de 30
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController); // busca por atributo

// Rutas con ID en la posición (editar debe ir antes que :id genérico)
router.get('/heroes/:id/editar', renderizarFormularioEditarController); // muestra el formulario de edición
router.post('/heroes/:id/editar', editarSuperheroeController); // procesa la edición

// Rutas con parámetros genéricos al final
router.get('/heroes', obtenerTodosLosSuperheroesController); // obtiene todos los héroes
router.get('/heroes/:id', obtenerSuperheroePorIdController); // obtiene un héroe por ID

// Rutas POST, PUT, DELETE
router.post('/heroes', crearSuperheroeController); // crea un nuevo héroe
router.put('/heroes/:id', actualizarSuperheroeController); // actualiza un héroe (API)

// Rutas DELETE - específicas primero
router.delete('/heroes/nombre/:nombre', borrarSuperheroePorNombreController); // elimina por nombre
router.delete('/heroes/:id', borrarSuperheroePorIdController); // elimina por ID

export default router;