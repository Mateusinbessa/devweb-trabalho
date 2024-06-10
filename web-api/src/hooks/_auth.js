import { useNavigate } from 'react-router-dom'
import { APP_KEY } from "src/config"

const useAuth = () => {
    const navigate = useNavigate()

    /*@Description:
        This function of signin is just an example, it's just taking whatever the user put in the login,
        and saving in localstorage, allowing him to pass as authenticated. You should implement it better,
        with API requests, and JWT token.    
    */
    const signin = async ({ name, role }) => {
        localStorage.setItem(APP_KEY, JSON.stringify({
            name: name,
            role: role
        }))
        navigate('/auth', { replace: true })
    }

    const signout = async (payload) => {
        localStorage.removeItem(APP_KEY)
        navigate('/', { replace: true })
    }

    return {
        signin,
        signout
    }
}

export default useAuth
export { useAuth }