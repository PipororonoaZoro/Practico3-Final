import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id)
{
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes()
{
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor)
{
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30()
{
    return await superHeroRepository.obtenerMayoresDe30();
}

// Nuevas funciones

export async function crearSuperheroe(datos)
{
    return await superHeroRepository.crear(datos);
}

export async function actualizarSuperheroe(id, datosActualizados)
{
    return await superHeroRepository.actualizar(id, datosActualizados);
}

export async function borrarSuperheroePorId(id)
{
    return await superHeroRepository.borrarPorId(id);
}

export async function borrarSuperheeroePorNombre(nombre)
{
    return await superHeroRepository.borrarPorNombre(nombre);
}