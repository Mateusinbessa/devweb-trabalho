'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { api } from '@/services/api'
import { useAppSelector } from '@/store'
import { start } from '@/store/slices/projectsSlice'

import { Breadcrumb } from '../../../components/Breadcrumb'
import { DialogCreateProject } from './components/DialogCreateProject'
import { ProjectsCards } from './components/ProjectsCards'

const page = () => {
	const [open, setOpen] = useState(false)
	const dispatch = useDispatch()
	const projects = useAppSelector((state) => state.projectsSlice.projects)

	useEffect(() => {
		api('/projects')
			.then((res) => res.json())
			.then((data) => {
				dispatch(start(data))
			})
	}, [])

	return (
		<main className=" mx-auto w-full max-w-[1440px] flex-col px-6 py-4">
			<Breadcrumb>
				<DialogCreateProject onOpenChange={setOpen} open={open} />
			</Breadcrumb>

			<div className="grid-cols mt-8 grid gap-4 lg:grid-cols-2">
				{projects.map((project) => (
					<ProjectsCards projectName={project} key={project} />
				))}
			</div>
		</main>
	)
}

export default page
