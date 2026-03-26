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
}

export default new SuperHeroRepository();