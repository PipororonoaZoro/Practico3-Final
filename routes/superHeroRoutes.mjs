import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    borrarSuperheroePorIdController,
    borrarSuperheroePorNombreController

} from '../controllers/superheroesController.mjs'

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);

// Nuevas rutas

router.get('/heroes/:id/editar', obtenerSuperheroePorIdController); // muestra el formulario
router.post('/heroes/:id/editar', editarSuperheroeController); // procesa el edición
router.post('/heroes/agregar', agregarSuperheroeController);
router.post('/heroes', crearSuperheroeController);
router.put('/heroes/:id', actualizarSuperheroeController);
router.delete('/heroes/:id', borrarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', borrarSuperheroePorNombreController);
router.delete('/heroes/:id', eliminarSuperheroeController);
export default router;