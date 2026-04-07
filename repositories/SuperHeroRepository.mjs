import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository
{
    async obtenerPorId(id)
    {
        return await SuperHero.findById(id);
    }

    async obtenerTodos()
    {
        return await SuperHero.find({});
    }

    // Resolución: Buscar por atributo
    async buscarPorAtributo(atributo, valor)
    {
        return await SuperHero.find({ [atributo]: valor });
    }

    // Resolución: obtener mayores de 30
    async obtenerMayoresDe30()
    {
        return await SuperHero.find({ edad: { $gt: 30 } });
    }

// --- Métodos nuevos gregados al preactico ---

    async crear(datos)
    {
        const nuevoHeroe = new SuperHero(datos);
        return await nuevoHeroe.save(); // dispara validaciones del schema
    }

    async actualizar(id, datosActualizados) 
    {
        return await SuperHero.findByIdAndUpdate(id, datosActualizados, {
        new: true,
        runValidators: true // 🔑 esto obliga a validar al actualizar
  });
}

    async borrarPorId(id)
    {
        return await SuperHero.findByIdAndDelete(id);
    }

    async borrarPorNombre(nombre)
    // Usamos el nomobre del campo del superheroe
    {
        return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });
    }
}

export default new SuperHeroRepository();