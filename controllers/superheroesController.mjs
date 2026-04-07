import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, crearSuperheroe, actualizarSuperheroe, borrarSuperheroePorId, borrarSuperheroePorNombre }  from "../services/superheroesService.mjs";
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

export async function obtenerSuperheroePorIdController(req, res)
{
    try
    {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe)
        {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    }
    catch (error)
    {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function obtenerTodosLosSuperheroesController(req, res)
{
    try
    {
        const superheroes = await obtenerTodosLosSuperheroes();

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    }
    catch (error)
    {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res)
{
    try
    {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0)
        {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con este atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    }
    catch (error)
    {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res)
{
    try
    {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0)
        {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    }
    catch (error)
    {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }

}
    
export async function crearSuperheroeController(req, res)
{
    try
    {
        const nuevoSuperheroe = await crearSuperheroe(req.body);
        const superheroeFormateado = renderizarSuperheroe(nuevoSuperheroe);
        res.status(201).json(superheroeFormateado);
    }
    catch (error)
    {
        if (error.name === 'ValidationError') {
        // Captura todos los mensajes de validación de Mongoose
        const mensajes = Object.values(error.errors).map(e => e.message);
        return res.status(400).json({ errores: mensajes });
        }
        res.status(500).send({ mensaje: 'Error al crear superhéroe', error: error.message });
    }
}

export async function actualizarSuperheroeController(req, res)
{
    try
    {
        const { id } = req.params;
        const datosActualizados = req.body;
        const superheroeActualizado = await actualizarSuperheroe(id, datosActualizados);
        if (!superheroeActualizado)
        {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para actualizar' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeActualizado);
        res.status(200).json(superheroeFormateado);
    }
    catch (error)
    {
        if (error.name === 'ValidationError') 
        {
        const mensajes = Object.values(error.errors).map(e => e.message);
        return res.status(400).json({ errores: mensajes });
        }
        res.status(500).send({ mensaje: 'Error al actualizar superhéroe', error: error.message });
    }
}

export async function borrarSuperheroePorIdController(req, res)
{
    try
    {
        const { id } = req.params;
        const superheroeBorrado = await borrarSuperheroePorId(id);
        if (!superheroeBorrado)
        {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para borrar' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeBorrado);
        res.status(200).json(superheroeFormateado);
    }
    catch (error)
    {
        res.status(500).send({ mensaje: 'Error al borrar superhéroe por ID', error: error.message });
    }
}

export async function borrarSuperheroePorNombreController(req, res)
{
    try
    {
        const { nombre } = req.params;
        const superheroeBorrado = await borrarSuperheroePorNombre(nombre);
        if (!superheroeBorrado)
        {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado para borrar' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroeBorrado);
        res.status(200).json(superheroeFormateado);
    }
    catch (error)
    {
        res.status(500).send({ mensaje: 'Error al borrar superhéroe por nombre', error: error.message });
    }
    
}
