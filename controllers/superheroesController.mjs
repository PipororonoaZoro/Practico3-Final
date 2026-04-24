import {
  obtenerTodosLosSuperheroes,
  crearSuperheroe,
  obtenerSuperheroePorId,
  actualizarSuperheroe,
  borrarSuperheroePorId
} from "../services/superheroesService.mjs";

// Controlador: listar todos los héroes
export async function obtenerTodosLosSuperheroesController(req, res) {
  try {
    const superheroes = await obtenerTodosLosSuperheroes();
    console.log("Superheroes desde MongoDB:", superheroes); // 👈 depuración
    res.render("dashboard", { superheroes });
  } catch (error) {
    res.status(500).send({
      mensaje: "Error al obtener los superhéroes",
      error: error.message
    });
  }
}

// Controlador: mostrar formulario de agregar
export function mostrarFormularioAgregarController(req, res) {
  res.render("addSuperhero");
}

// Controlador: agregar héroe
export async function agregarSuperheroeController(req, res) {
  try {
    console.log("Datos recibidos del formulario:", req.body);

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

// Controlador: editar héroe
export async function editarSuperheroeController(req, res) {
  try {
    const id = req.params.id;
    const heroe = await obtenerSuperheroePorId(id);
    res.render("editSuperhero", { heroe });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener el superhéroe", error: error.message });
  }
}

// Controlador: actualizar héroe
export async function actualizarSuperheroeController(req, res) {
  try {
    const id = req.params.id;
    const datosActualizados = req.body;
    await actualizarSuperheroe(id, datosActualizados);
    res.redirect("/api/heroes");
  } catch (error) {
    res.status(500).send({ mensaje: "Error al actualizar el superhéroe", error: error.message });
  }
}

// Controlador: borrar héroe
export async function borrarSuperheroeController(req, res) {
  try {
    const id = req.params.id;
    await borrarSuperheroePorId(id);
    res.redirect("/api/heroes");
  } catch (error) {
    res.status(500).send({ mensaje: "Error al borrar el superhéroe", error: error.message });
  }
}
