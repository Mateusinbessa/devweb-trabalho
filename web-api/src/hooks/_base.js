import { useDispatch } from 'react-redux'

const useBase = ({ url, saveAction, readAction }) => {
    const dispatch = useDispatch()

    const save = (params) => {
        dispatch(saveAction(params))
    }
    const read = (params) => {
        dispatch(readAction(params))
    }
    return {
        save,
        read
    }
}

export default useBase
export { useBase }