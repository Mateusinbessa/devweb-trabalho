import { save, read, readAll } from 'src/reducers/model/modelSlice'
import useBase from "./_base";

const useModel = () => {
    const base = useBase({ url: 'all', saveAction: save, readAction: read, readAllAction: readAll })

    return {
        ...base
    }
}

export default useModel
export { useModel }