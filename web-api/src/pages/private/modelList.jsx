import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useModel } from 'src/hooks'
import { useEffect } from 'react'
import { api } from 'src/services'
import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ModelList = () => {

    const Model = useModel()
    const navigate = useNavigate()


    useEffect(() => {
        Model.readAll()
    }, [])
    const handleClick = (el) => {
        navigate(`/auth/model/edit?model=${el.name}&file=${el.file}&route=${el.route}`)
    }

    const { models } = useSelector((s) => s.model)
    if (!models) return null
    console.log(models)
    return (
        <>
            <Helmet>
                <title>API-Generator :: Home</title>
            </Helmet>
            <div className='flex flex-col gap-3'>
                <h1 className='text-4xl'>Models List</h1>
                <table className='min-w-full bg-white border border-gray-200'>
                    <thead>
                        <tr>
                            <th className='py-2 px-4 border-b text-left'>Name</th>
                            <th className='py-2 px-4 border-b text-left'>File</th>
                            <th className='py-2 px-4 border-b text-left'>Route</th>
                            <th className='py-2 px-4 border-b text-left'>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {models.map((el, ix) => (
                            <tr key={ix} className='hover:bg-gray-100'>
                                <td className='py-2 px-4 border-b'>{el.name}</td>
                                <td className='py-2 px-4 border-b'>{el.file}</td>
                                <td className='py-2 px-4 border-b'>{el.route}</td>
                                <td
                                    className='py-2 px-4 border-b'
                                >
                                    <Pencil className='cursor-pointer' onClick={() => handleClick(el)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ModelList
export { ModelList }