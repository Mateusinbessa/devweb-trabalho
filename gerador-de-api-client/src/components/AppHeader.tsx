'use client'

import Link from 'next/link'
import { useState } from 'react'

import { DialogCreateModels } from './DialogCreateModels'

export const AppHeader = ({
	hasModalToCreateModel = false,
}: {
	hasModalToCreateModel?: boolean
}) => {
	const [open, setOpen] = useState(false)

	return (
		<header className="bg-gray-100  dark:bg-gray-800">
			<div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
				<Link href={'/'}>
					<h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
						Gerador de API
					</h1>
				</Link>
				{hasModalToCreateModel && (
					<DialogCreateModels onOpenChange={setOpen} open={open} />
				)}
			</div>
		</header>
	)
}
