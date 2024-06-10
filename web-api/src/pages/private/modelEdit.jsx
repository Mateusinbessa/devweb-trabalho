import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'

const ModelEdit = () => {
    const { search } = useLocation()
    const { handleSubmit, register, reset } = useForm()
    const [query, setQuery] = useState({ model: null, file: null, route: null })

    useEffect(() => {
        const { model, file, route } = qs.parse(search)
        reset({
            model: model ? model : null,
            file: file ? file : null,
            route: route ? route : null,
        })
    }, [search])
    const customSubmit = async (data) => {
        console.log(data)
    }

    return (
        <>
            <Helmet>
                <title>API-Generator :: Edit</title>
            </Helmet>
            <div className='flex flex-col gap-3'>
                <h1 className='text-4xl'>ModelEdit</h1>
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
                {/* <p>Model: {query.model}</p>
                <p>File: {query.file}</p>
                <p>Route: {query.route}</p> */}
            </div>
        </>
    )
}

export default ModelEdit
export { ModelEdit }