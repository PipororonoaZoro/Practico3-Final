import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarsuperheroesporatributoController,
    obtenerSuperheroesMayoresDe30Controller
} from '../controllers/superheroesController.mjs'

const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarsuperheroesporatributoController);
router.get('heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);

export default router;