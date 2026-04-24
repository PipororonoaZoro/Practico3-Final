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
    return await SuperHero.findByIdAndUpdate(id, datosActualizados, {
      new: true,
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
