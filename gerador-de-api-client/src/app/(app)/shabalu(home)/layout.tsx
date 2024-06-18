import { ReactNode } from 'react'

import { AppHeader } from '@/components/AppHeader'

const layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<AppHeader />
			{children}
		</>
	)
}

export default layout
