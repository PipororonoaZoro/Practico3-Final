import SuperHero from "../models/SuperHero.mjs";

class SuperHeroRepository {
  async crear(datos) {
    const nuevoHeroe = new SuperHero(datos);
    return await nuevoHeroe.save();
  }

  async obtenerTodos() {
    return await SuperHero.find();
  }

  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }

  async buscarPorAtributo(atributo, valor) {
    const filtro = {};
    filtro[atributo] = valor;
    return await SuperHero.find(filtro);
  }

  async obtenerMayoresDe30() {
    return await SuperHero.find({ edad: { $gt: 30 } });
  }

 async actualizar(id, datosActualizados) {
  const datos = {
    nombre: datosActualizados.nombre,
    nombreReal: datosActualizados.nombreReal,
    edad: datosActualizados.edad ? Number(datosActualizados.edad) : undefined,
    planetaOrigen: datosActualizados.planetaOrigen,
    debilidad: datosActualizados.debilidad && datosActualizados.debilidad.trim().length >= 3
      ? datosActualizados.debilidad.trim()
      : undefined,
    poderes: datosActualizados.poderes
      ? datosActualizados.poderes.split(",").map(p => p.trim()).filter(p => p.length >= 3 && p.length <= 60)
      : [],
    aliados: datosActualizados.aliados
      ? datosActualizados.aliados.split(",").map(a => a.trim()).filter(a => a.length > 0)
      : [],
    enemigos: datosActualizados.enemigos
      ? datosActualizados.enemigos.split(",").map(e => e.trim()).filter(e => e.length > 0)
      : []
  };

  return await SuperHero.findByIdAndUpdate(id, datos, {
    returnDocument: 'after',
    runValidators: true
  });
  }


  async borrarPorId(id) {
    return await SuperHero.findByIdAndDelete(id);
  }

  async borrarPorNombre(nombre) {
    return await SuperHero.findOneAndDelete({ nombre });
  }

  async eliminar(id) {
    return await SuperHero.findByIdAndDelete(id);
  }
}

export default new SuperHeroRepository();
