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

    async buscarPorAtributo(atributo, valor)
    {
        RESOLVER
    }

    async obtenerMayoresDe30()
    {
        RESOLVER
    }
}

export default new SuperHeroRepository();