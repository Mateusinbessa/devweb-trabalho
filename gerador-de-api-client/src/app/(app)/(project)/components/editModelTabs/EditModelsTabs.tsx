import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EditModelTabsRoute } from './EditModelTabsRoute'
import { EditModelTabsModelName } from './EditModelTabsModelName'

export function EditModelsTabs() {
	return (
		<Tabs defaultValue="table" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="table">Tabela</TabsTrigger>
				<TabsTrigger value="rota">Rota</TabsTrigger>
			</TabsList>
			<TabsContent value="table">
				<EditModelTabsModelName />
			</TabsContent>
			<TabsContent value="rota">
				<EditModelTabsRoute />
			</TabsContent>
		</Tabs>
	)
}
