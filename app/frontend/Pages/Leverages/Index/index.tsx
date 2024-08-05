import React from 'react'
import { Routes } from '@/lib'
import { IndexTableTemplate } from '@/Features'
import { NewIcon } from '@/Components/Icons'
import LeveragesTable from '../Table'

interface LeverageIndexProps {
	leverages: Schema.LeveragesIndex[]
	pagination: Schema.Pagination
}

const LeveragesIndex = ({ leverages, pagination }: LeverageIndexProps) => {
	return (
		<IndexTableTemplate
			title="Leverages"
			model="leverages"
			rows={ leverages }
			pagination={ pagination }
			contextMenu={ {
				deleteRoute: Routes.leverages(),
				[
					{ label: 'New Leverage', href: Routes.newLeverage(), icon: NewIcon },
				]
			} }
		>
			<LeveragesTable />
		</IndexTableTemplate>
	)
}

export default LeveragesIndex
