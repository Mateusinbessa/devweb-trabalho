'use client'

import { Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { EditModelsTabs } from './editModelTabs/EditModelsTabs'
import { useDispatch } from 'react-redux'
import { ModelState, start } from '@/store/slices/editSlice'

interface DialogHeaderModalProps {
	name: string
	file: string
	route: string
}

export function ModalEditModels({ name, file, route }: DialogHeaderModalProps) {
	const dispatch = useDispatch()

	const handleSetItemToEdit = (item: any) => {
		console.log(item)

		dispatch(start(item))
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					size={'icon'}
					variant={'outline'}
					onClick={() => handleSetItemToEdit({ name, file, route })}
				>
					<Pencil size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-lg pt-10 ">
				<EditModelsTabs />
			</DialogContent>
		</Dialog>
	)
}
