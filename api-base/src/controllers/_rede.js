import { RedeModel } from '../models/index.js'
import { BaseController } from './index.js'
const Rede = RedeModel()

const RedeController = () => {
    const include = {}
    const base = BaseController(
        {
            save: Rede.save,
            getOne: Rede.getOne,
            getAll: Rede.getAll,
            update: Rede.update,
            remove: Rede.remove,
            getTotalObjects: Rede.getTotalObjects,
            include: include,
        }
    )
    return {
        ...base,
    }
}

export default RedeController
export { RedeController }
