import { TesteModel } from '../models/index.js'
import { BaseController } from './index.js'
const Teste = TesteModel()

const TesteController = () => {
    const include = {}
    const base = BaseController(
        {
            save: Teste.save,
            getOne: Teste.getOne,
            getAll: Teste.getAll,
            update: Teste.update,
            remove: Teste.remove,
            getTotalObjects: Teste.getTotalObjects,
            include: include,
        }
    )
    return {
        ...base,
    }
}

export default TesteController
export { TesteController }
