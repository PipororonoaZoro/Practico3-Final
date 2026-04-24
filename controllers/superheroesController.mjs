import {
  obtenerTodosLosSuperheroes,
  crearSuperheroe,
  obtenerSuperheroePorId,
  actualizarSuperheroe,
  borrarSuperheroePorId
} from "../services/superheroesService.mjs";

// Listar todos
export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    res.render("dashboard", { heroes: superheroes }); // 👈 pasamos heroes
  } catch (error) {
    res.status(500).send("Error al obtener los superhéroes");
  }
}

// Mostrar formulario agregar
export function mostrarFormularioAgregarController(req, res) {
  res.render("addSuperhero");
}

// Agregar héroe
export async function agregarSuperheroeController(req, res) {
  try {
    const { nombre, nombreReal, edad, planeta, poderes, aliados, enemigos } = req.body;

    const datos = {
      nombre,
      nombreReal,
      edad,
      planeta,
      poderes: poderes.split(",").map(p => p.trim()).filter(p => p.length > 0),
      aliados: aliados ? aliados.split(",").map(a => a.trim()).filter(a => a.length > 0) : [],
      enemigos: enemigos ? enemigos.split(",").map(e => e.trim()).filter(e => e.length > 0) : []
    };

    await crearSuperheroe(datos);
    res.redirect("/api/heroes");
  } catch (error) {
    res.status(500).render("addSuperhero", { error: error.message });
  }
}

// Editar
export async function editarSuperheroeController(req, res) {
  try {
    const id = req.params.id;
    const heroe = await obtenerSuperheroePorId(id);
    res.render("editSuperhero", { heroe });
  } catch (error) {
    res.status(500).send("Error al obtener el superhéroe");
  }
}

// Actualizar
export async function actualizarSuperheroeController(req, res) {
  try {
    const id = req.params.id;
    await actualizarSuperheroe(id, req.body);
    res.redirect("/api/heroes");
  } catch (error) {
    res.status(500).send("Error al actualizar el superhéroe");
  }
}

// Borrar
export async function borrarSuperheroeController(req, res) {
  try {
    const id = req.params.id;
    await borrarSuperheroePorId(id);
    res.redirect("/api/heroes");
  } catch (error) {
    res.status(500).send("Error al borrar el superhéroe");
  }
}
