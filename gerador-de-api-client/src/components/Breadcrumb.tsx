import Link from 'next/link'
import { ReactNode } from 'react'

export const Breadcrumb = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex items-center gap-2 ">
			<Link href={'/'} className="text-xl font-bold">
				Home
			</Link>
			<span className="font-medium text-gray-400 after:content-['/'] " />
			{children}
		</div>
	)
}
