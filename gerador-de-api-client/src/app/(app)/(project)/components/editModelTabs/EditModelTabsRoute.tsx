import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/services/api'
import { useDispatch } from 'react-redux'
import { edit } from '@/store/slices/modelsSlice'
import { useAppSelector } from '@/store'

const schema = z.object({
	newRouteName: z
		.string()
		.min(
			4,
			'Nome da Nova Rota deve ter pelo menos 4 caracteres incluindo a barra inicial.',
		)
		.refine((value) => /^\/[a-z]+$/i.test(value), {
			message:
				'Nome da Nova Rota deve começar com uma barra seguida apenas por letras sem espaços ou caracteres especiais.',
		}),
})

type EditRouteSchema = z.infer<typeof schema>

export const EditModelTabsRoute = () => {
	const shablau = useAppSelector((state) => state.editSlice.models)
	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<EditRouteSchema>({
		resolver: zodResolver(schema),
		defaultValues: {
			newRouteName: '',
		},
	})

	const onSubmit = async (data: EditRouteSchema) => {
		console.log(data)

		const { newRouteName } = data

		try {
			const response = await api('/api/routes', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					old_route: shablau.route,
					new_route: newRouteName,
				}),
			})

			console.log(response)

			if (response.status === 201) {
				console.log('oi')

				dispatch(edit({ oldRoute: shablau.route, newRoute: newRouteName }))
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
				<CardTitle>Rota</CardTitle>
				<CardDescription>
					Edite as informações sobre a rota aqui. Clique em salvar quando
					terminar.
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
							Rota antiga
						</Label>
						<Input id="newRouteName" value={shablau.route} disabled />
					</div>
					<div className="flex flex-col  gap-4">
						<Label htmlFor="newRouteName" className="text-left">
							Nome da Nova Rota
						</Label>
						<Input id="newRouteName" {...register('newRouteName')} />
					</div>
					{errors.newRouteName && (
						<span className="text-sm text-red-600	">
							{errors.newRouteName.message}
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

// export function DialogCreateModels({
// 	open,
// 	onOpenChange,
// }: DialogHeaderModalProps) {
// 	useEffect(() => {
// 		reset()
// 	}, [open])

// 	const dispatch = useDispatch()

// 	return (
// 		<Dialog onOpenChange={onOpenChange} open={open}>
// 			<DialogTrigger asChild>
// 				<Button>Criar Model</Button>
// 			</DialogTrigger>
// 			<DialogContent className="rounded-lg sm:max-w-[425px]">
// 				<DialogHeader>
// 					<DialogTitle>Adicionar Modelo</DialogTitle>
// 					<DialogDescription>
// 						Preencha as informações sobre o novo modelo.
// 					</DialogDescription>
// 				</DialogHeader>
// 			</DialogContent>
// 		</Dialog>
// 	)
// }
