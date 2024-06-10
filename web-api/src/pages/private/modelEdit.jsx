import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useUser } from 'src/hooks'
import { useEffect, useState } from 'react'
import { api } from 'src/services'
import { useLocation } from 'react-router-dom'
import qs from 'query-string'

const ModelEdit = () => {
    const { search } = useLocation()
    const [query, setQuery] = useState({ model: null, file: null, route: null })
    useEffect(() => {
        const { model, file, route } = qs.parse(search)
        setQuery({ model: model, file: file, route: route })
    }, [search])
    return (
        <>
            <Helmet>
                <title>API-Generator :: Edit</title>
            </Helmet>
            <div className='flex flex-col gap-3'>
                <h1 className='text-4xl'>ModelEdit</h1>
                <p>Model: {query.model}</p>
                <p>File: {query.file}</p>
                <p>Route: {query.route}</p>
            </div>
        </>
    )
}

export default ModelEdit
export { ModelEdit }