import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useUser } from 'src/hooks'
import { useEffect } from 'react'
import { api } from 'src/services'

const Home = () => {

    const { read } = useUser()
    const { handleSubmit, register } = useForm()

    useEffect(() => {
        read({ name: 'Mateus', role: 'ADMIN', pwd: '****' })
    }, [])

    const customSubmit = async (data) => {
        const request = {
            model: data.model,
            file: data.file,
            junctionTable: data.junctionTable,
            route: data.route
        }
        try {
            const data = await api.post('/generate', request)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const user = useSelector((s) => s.user.user)
    if (!user) return null
    return (
        <>
            <Helmet>
                <title>API-Generator :: Home</title>
            </Helmet>
            <div className='flex flex-col gap-3'>
                <h1 className='text-4xl'>Model</h1>
                <form autoComplete='off' onSubmit={handleSubmit(customSubmit)}>
                    <div className='flex flex-col'>
                        <label htmlFor='model'>Nome do Model: </label>
                        <input
                            id='model'
                            type='text'
                            className='input w-[200px] max-md:w-[200px] max-sm:w-[200px] h-[15px]'
                            {...register('model')}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='file'>Nome do arquivo: </label>
                        <input
                            id='file'
                            type='text'
                            className='input w-[200px] max-md:w-[200px] max-sm:w-[200px] h-[15px]'
                            {...register('file')}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='table'>Tabela de ligação: </label>
                        <input
                            id='table'
                            type='text'
                            className='input w-[200px] max-md:w-[200px] max-sm:w-[200px] h-[15px]'
                            {...register('junctionTable')}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor='route'>Nome da rota: </label>
                        <input
                            id='route'
                            type='text'
                            className='input w-[200px] max-md:w-[200px] max-sm:w-[200px] h-[15px]'
                            {...register('route')}
                        />
                    </div>
                    <button className='btn mt-3' type='submit'>Enviar</button>
                </form>
            </div>
        </>
    )
}

export default Home
export { Home }