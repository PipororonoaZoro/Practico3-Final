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

router.post('/heroes', crearSuperheroeController);
router.put('/heroes/:id', actualizarSuperheroeController);
router.delete('/heroes/:id', borrarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', borrarSuperheroePorNombreController);

export default router;