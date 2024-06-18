import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/services/api'
import { useDispatch } from 'react-redux'
import { add } from '@/store/slices/modelsSlice'
import { useAppSelector } from '@/store'

const schema = z.object({
	newModelName: z
		.string()
		.min(3, 'Nome da Nova Rota deve ter pelo menos 3 caracteres.')
		.refine((value) => /^[a-z]+$/i.test(value), {
			message:
				'Nome da Nova Rota deve conter apenas letras sem espaços ou caracteres especiais.',
		}),
})

type EditModelSchema = z.infer<typeof schema>

export const EditModelTabsModelName = () => {
	const shablau = useAppSelector((state) => state.editSlice.models)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<EditModelSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			newModelName: '',
		},
	})

	const onSubmit = async (data: EditModelSchema) => {
		console.log(data)

		const { newModelName } = data

		try {
			const response = await api('/api/models', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: newModelName,
					file: shablau.file,
				}),
			})

			if (response.status === 201) {
				// dispatch(
				// 	add({
				// 		file: fileName,
				// 		name: modelName,
				// 		route: routeName,
				// 		newRoute: newRouteName,
				// 	}),
				// )

				reset()

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
		<Card>
			<CardHeader className="pb-0">
				<CardTitle>Tabela Prisma</CardTitle>
				<CardDescription>
					Edite as informações sobre a tabela do schemaF aqui. Clique em salvar
					quando terminar.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					className="grid gap-4 "
					onSubmit={handleSubmit((data) => {
						onSubmit(data)
					})}
				>
					<div className="flex flex-col  gap-4">
						<Label htmlFor="newRouteName" className="text-left">
							Arquivo
						</Label>
						<Input id="newRouteName" value={shablau.file} disabled />
					</div>
					<div className="flex flex-col  gap-4">
						<Label htmlFor="newRouteName" className="text-left">
							Nome do Modelo schema prisma
						</Label>
						<Input id="newRouteName" {...register('newModelName')} />
					</div>
					{errors.newModelName && (
						<span className="text-sm text-red-600	">
							{errors.newModelName.message}
						</span>
					)}
					<Button type="submit" disabled={isSubmitting}>
						Enviar
						{isSubmitting && '...'}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
