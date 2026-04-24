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
        res.render('dashboard', { superheroes });
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

export async function agregarSuperheroeController(req, res) {
  try {
    const { nombre, nombreReal, edad, planeta, poderes, aliados, enemigos } = req.body;

    // Validar campos requeridos
    if (!nombre || !nombreReal || !edad || !poderes) {
      return res.status(400).render("addSuperhero", { error: "Por favor complete todos los campos requeridos" });
    }

    // Transformar campos separados por coma en arrays
    const datos = {
      nombre,
      nombreReal,
      edad,
      planeta,
      poderes: poderes.split(",").map(p => p.trim()).filter(p => p.length > 0),
      aliados: aliados ? aliados.split(",").map(a => a.trim()).filter(a => a.length > 0) : [],
      enemigos: enemigos ? enemigos.split(",").map(e => e.trim()).filter(e => e.length > 0) : []
    };

    await crearSuperheroe(datos);   // 👈 guarda en MongoDB
    res.redirect("/api/heroes");    // 👈 vuelve al dashboard
  } catch (error) {
    res.status(500).render("addSuperhero", { error: error.message });
  }
}

export async function renderizarFormularioEditarController(req, res) {
    try 
    {
        const hero = await obtenerSuperheroePorId(req.params.id);
        res.render('editSuperhero', { hero });
    }
    catch (error)
    {
        res.status(404).send({ mensaje: 'Superhéroe no encontrado', error: error.message })
    }
}

export async function editarSuperheroeController(req, res) {
    try
    {
        const datos = {
            ...req.body,
            poderes: req.body.poderes.split(",").map(p => p.trim()).filter(p => p.length > 0),
            aliados: req.body.aliados ? req.body.aliados.split(",").map(a => a.trim()).filter(a => a.length > 0) : [],
            enemigos: req.body.enemigos ? req.body.enemigos.split(",").map(e => e.trim()).filter(e => e.length > 0) : []
        };

        const heroActualizado = await actualizarSuperheroe(req.params.id, datos);
        if (!heroActualizado) {
            return res.status(404).render('editSuperhero', { hero: {}, error: 'Superhéroe no encontrado' });
        }
        res.redirect('/api/heroes');
    }
    catch (error)
    {
        if (error.name === 'ValidationError') {
            const mensajes = Object.values(error.errors).map(e => e.message);
            const hero = await obtenerSuperheroePorId(req.params.id);
            return res.status(400).render('editSuperhero', { hero, error: mensajes.join(', ') });
        }
        res.status(400).render('editSuperhero', { hero: {}, error: error.message });
    }
}

export async function eliminarSuperheroeController(req, res) {
    try
    {
        await borrarSuperheroePorId(req.params.id); // llama al service
        res.redirect('/api/heroes'); // vuelve al dashboard
    }
    catch (error)
    {
        res.status(500).send({ mensaje: 'Error al eliminar superhéroe', error: error.message });
    }
}