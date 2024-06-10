import { useDispatch } from 'react-redux'
import { api } from 'src/services'

const useBase = ({ url, saveAction, readAction, readAllAction }) => {
    const dispatch = useDispatch()

    const save = (params) => {
        dispatch(saveAction(params))
    }
    const read = (params) => {
        dispatch(readAction(params))
    }
    const readAll = async (params) => {
        const { data: { data: { models } } } = await api.get(url)
        dispatch(readAllAction(models))
    }
    return {
        save,
        read,
        readAll
    }
}

export default useBase
export { useBase }