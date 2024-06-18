import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface ProjectsCardsProps {
	projectName: string
}

export const ProjectsCards = ({ projectName }: ProjectsCardsProps) => {
	const normalizedProjectName = projectName.replace(/\s/g, '-') // Se usar o lowercase, ele quebra, talvez procurar outra forma

	return (
		<div
			className=" w-full rounded-3xl border-2 border-gray-100 bg-white p-4 shadow
		"
		>
			<Link
				href={`/project/${normalizedProjectName}`}
				className=" flex items-center justify-between rounded-2xl bg-transparent p-2
      transition focus-within:bg-gray-100 hover:bg-gray-100 focus:bg-gray-100
      active:bg-gray-200"
			>
				<div className="flex items-center gap-3 font-mono text-lg">
					<div
						className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl
            border-2 border-violet-300 bg-violet-500 text-lg font-bold uppercase
          text-white shadow-md shadow-violet-300/50"
					>
						{projectName[0]}
					</div>
					<div className="truncate whitespace-nowrap">{projectName}</div>
				</div>
				<ChevronRight />
			</Link>
		</div>
	)
}
