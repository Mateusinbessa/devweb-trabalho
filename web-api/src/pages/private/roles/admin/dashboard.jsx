import { Navigate } from 'react-router-dom'
import { useUtil } from "src/hooks"

const Dashboard = () => {
    /*
    @Description:
        This is just an example of role implementation in the application. I'm gettin the ROLE from localStorage,
        What shouldn't be done!!! Get it from a JWT decoded!! It's more secure!
    */
    const { getUser } = useUtil()
    const user = getUser()
    if (user.role !== 'ADMIN') return <Navigate to='/forbidden' replace />

    return (
        <div>This page should only be visible to the Admin</div>
    )
}

export default Dashboard