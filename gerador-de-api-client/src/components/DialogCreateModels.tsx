'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/services/api'
import { useDispatch } from 'react-redux'
import { add } from '@/store/slices/modelsSlice'

const schema = z.object({
	modelName: z
		.string()
		.min(3, 'Nome do Modelo deve ter pelo menos 3 caracteres.')
		.refine((value) => /^[A-Za-z]+$/i.test(value), {
			message:
				'Nome do Modelo deve conter apenas letras sem espaços ou caracteres especiais.',
		})
		.refine((value) => value[0] !== value[0].toLowerCase(), {
			message: 'Coloque a primeira letra do nome do modelo em maiúsculo.',
		}),
	fileName: z
		.string()
		.min(3, 'Nome do Arquivo deve ter pelo menos 3 caracteres.')
		.refine((value) => /^[A-Za-z]+$/i.test(value), {
			message:
				'Nome do Arquivo deve conter apenas letras sem espaços ou caracteres especiais.',
		}),
	junctionTable: z.string().optional(),
	routeName: z
		.string()
		.min(3, 'Nome da Rota deve ter pelo menos 3 caracteres.')
		.refine((value) => /^[a-z]+$/i.test(value), {
			message:
				'Nome da rota deve conter apenas letras sem espaços ou caracteres especiais.',
		}),
})

type createModelSchema = z.infer<typeof schema>

interface DialogHeaderModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function DialogCreateModels({
	open,
	onOpenChange,
}: DialogHeaderModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<createModelSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			modelName: '',
			fileName: '',
			junctionTable: '',
			routeName: '',
		},
	})

	useEffect(() => {
		reset()
	}, [open])

	const dispatch = useDispatch()

	const onSubmit = async (data: createModelSchema) => {
		console.log(data)

		const { fileName, modelName, routeName, junctionTable } = data

		const normalizeModelname =
			modelName.charAt(0).toUpperCase() + modelName.slice(1)

		console.log(normalizeModelname)

		try {
			const response = await api('/api/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: normalizeModelname,
					file: fileName,
					route: routeName,
					junctionTable: junctionTable,
				}),
			})

			if (response.status === 201) {
				dispatch(
					add({
						file: fileName,
						name: modelName,
						route: routeName,
					}),
				)

				// TODO: redirect to project page
				// TODO: show toast message
				console.log('Project created successfully')
			} else {
				console.error('Failed to create project')
			}
		} catch (error) {
			console.error('Error:', error)
		}
	}

	return (
		<Dialog onOpenChange={onOpenChange} open={open}>
			<DialogTrigger asChild>
				<Button>Criar Model</Button>
			</DialogTrigger>
			<DialogContent className="rounded-lg sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Adicionar Modelo</DialogTitle>
					<DialogDescription>
						Preencha as informações sobre o novo modelo.
					</DialogDescription>
				</DialogHeader>
				<form
					className="grid gap-4 py-4"
					onSubmit={handleSubmit((data) => {
						onSubmit(data)
					})}
				>
					<div className="flex flex-col  gap-4 sm:grid sm:grid-cols-4 sm:items-center">
						<Label htmlFor="modelName" className="text-left">
							Nome do Modelo
						</Label>
						<Input
							id="modelName"
							className="col-span-3"
							{...register('modelName')}
						/>
					</div>
					{errors.modelName && (
						<span className="text-sm text-red-600	">
							{errors.modelName.message}
						</span>
					)}
					<div className="flex flex-col  gap-4 sm:grid sm:grid-cols-4 sm:items-center">
						<Label htmlFor="fileName" className="text-left">
							Nome do Arquivo
						</Label>
						<Input
							id="fileName"
							className="col-span-3"
							{...register('fileName')}
						/>
					</div>
					{errors.fileName && (
						<span className="text-sm text-red-600	 ">
							{errors.fileName.message}
						</span>
					)}
					<div className="flex flex-col  gap-4 sm:grid sm:grid-cols-4 sm:items-center">
						<Label htmlFor="junctionTable" className="text-left">
							Tabela de Junção
						</Label>
						<Input
							id="junctionTable"
							className="col-span-3"
							{...register('junctionTable')}
						/>
					</div>
					{errors.junctionTable && (
						<span className="text-sm text-red-600	">
							{errors.junctionTable.message}
						</span>
					)}
					<div className="flex flex-col  gap-4 sm:grid sm:grid-cols-4 sm:items-center">
						<Label htmlFor="routeName" className="text-left">
							Nome da Rota
						</Label>
						<Input
							id="routeName"
							className="col-span-3"
							{...register('routeName')}
						/>
					</div>
					{errors.routeName && (
						<span className="text-sm text-red-600	">
							{errors.routeName.message}
						</span>
					)}
					<Button type="submit" disabled={isSubmitting}>
						Enviar
						{isSubmitting && '...'}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
