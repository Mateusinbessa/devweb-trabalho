import { Breadcrumb } from '@/components/Breadcrumb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { ListModels } from './components/ListModels'

export default function page({
	params,
}: {
	params: { 'project-name': string }
}) {
	// const shablau = params['project-name'].replace(/-/g, ' ')

	return (
		<div className="mx-auto w-full max-w-[1440px] rounded-none border-0 p-6 shadow-none">
			{/* <Breadcrumb>{shablau}</Breadcrumb> */}
			<Card className="w-full rounded-none border-0 shadow-none">
				<CardHeader className="px-0">
					<CardTitle>Informações do Modelo</CardTitle>
				</CardHeader>
				<CardContent className="px-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Nome da Rota</TableHead>
								<TableHead>Modelo</TableHead>
								<TableHead>Arquivo</TableHead>
								<TableHead className="w-6">Editar</TableHead>
							</TableRow>
						</TableHeader>
						<ListModels />
					</Table>
				</CardContent>
			</Card>
		</div>
	)
}
