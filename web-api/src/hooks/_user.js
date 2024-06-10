import { save, read } from 'src/reducers/user/userSlice'
import useBase from "./_base";

const useUser = () => {
    const base = useBase({ url: '', saveAction: save, readAction: read })

    return {
        ...base
    }
}

export default useUser
export { useUser }