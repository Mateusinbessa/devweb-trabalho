import { Outlet } from 'react-router-dom'

const Public = () => {
    return (
        <section>
            <Outlet />
        </section>
    )
}

export default Public
export { Public }