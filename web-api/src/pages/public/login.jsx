import { useAuth, useUtil } from "src/hooks"
import { Navigate } from 'react-router-dom'
import { useUser } from 'src/hooks'
import { useForm } from "react-hook-form"

const Login = () => {
    const { getUser } = useUtil()
    const { signin } = useAuth()
    const { save } = useUser()
    const { handleSubmit, register } = useForm()

    if (getUser()) return <Navigate to='/auth' replace />
    return (
        <form onSubmit={handleSubmit(signin, save)}>
            <div>
                <label>Name :</label>
                <input
                    type="text"
                    {...register('name')}
                />
            </div>
            <div>
                <label>Role :</label>
                <input
                    type="text"
                    {...register('role')}
                />
            </div>
            <div>
                <label>Password :</label>
                <input
                    type="text"
                    {...register('pwd')}
                />
            </div>
            <button type="submit">Logar</button>
        </form>
    )
}

export default Login
export { Login }