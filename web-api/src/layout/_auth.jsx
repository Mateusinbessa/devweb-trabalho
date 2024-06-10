import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useUtil } from "src/hooks"
import { useAuth } from 'src/hooks'

const Auth = () => {
    /*
    @Description --> Update GETUSER function!
        User validation: if there's no user authenticated redirect to login. You can use access and refresh token,
        localStorage with valid JWT, bro i don't know, it's totally up to you. Down below it's an example of
        how you, can set up this, i'm just seeing if there's an user saved in localStorage (saved by the login page),
        if there's no user, and you're trying to access the authenticated part of the appliaction, you'll be redirected,
        to the login page.

        It's not verirying not, it's no checking JWT, it's just seeing if there's a user in localStorage, so,
        implement a better approach of authetintication, here is just an "model" half-implemented, so that you
        don't need to start from scratch, and it's not safe, IT COULD BE EASILY HACKED. 
    */
    const { getUser } = useUtil()
    const navigate = useNavigate()
    const { signout } = useAuth()
    if (!getUser()) return <Navigate to='/login' replace />
    return (
        <section className='max-container padding-x'>
            <button type='button' className='btn' onClick={() => navigate('/')}>Home</button>
            <Outlet />
        </section>
    )
}

export default Auth
export { Auth }