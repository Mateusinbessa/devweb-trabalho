import { Navigate, createBrowserRouter } from "react-router-dom";
import { Auth, Public } from 'src/layout';
import React from "react";

//Auth
// const AdminPage = React.lazy(() => import('src/pages/private/roles/admin/dashboard'));
const ModelGenerate = React.lazy(() => import('src/pages/private/modelGenerate'));
const ModelList = React.lazy(() => import('src/pages/private/modelList'));
const ModelEdit = React.lazy(() => import('src/pages/private/modelEdit'));

//Public
const Forbidden = React.lazy(() => import('src/pages/public/forbidden'))
const NotFound = React.lazy(() => import('src/pages/public/notFound'))
const Login = React.lazy(() => import('src/pages/public/login'))

const routes = createBrowserRouter([
    {
        //Private routes
        path: 'auth', element: <Auth />, children: [
            { index: true, element: <Navigate to='model' replace={true} /> },
            {
                path: 'model', children: [
                    { index: true, element: <Navigate to='generate' replace={true} /> },
                    { path: 'generate', element: <ModelGenerate /> },
                    { path: 'list', element: <ModelList /> },
                    { path: 'edit', element: <ModelEdit /> },
                ]
            },
            // { path: 'admin', element: <AdminPage /> },
            { path: '*', element: <Navigate to='/404' /> },
        ]
    },
    {
        //Public routes
        path: '', element: <Public />, children: [
            { path: '', element: <Navigate to='login' /> },
            { path: 'login', element: <Login /> },
            { path: '404', element: <NotFound /> },
            { path: 'forbidden', element: <Forbidden /> },
            { path: '*', element: <Navigate to='404' /> },

        ]
    }
]);

export default routes;