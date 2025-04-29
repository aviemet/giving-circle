import React from "react"

import { Table } from "@/components"

import TableTitleSection, { IndexTableTitleSectionProps } from "../TableTitleSection"

interface IndexTableTemplateProps extends IndexTableTitleSectionProps {
	model: string
	rows: Record<string, any>[]
	pagination: Schema.Pagination
	search?: boolean
	advancedSearch?: React.ReactNode
}

const IndexTableTemplate = ({
	children,
	model,
	rows,
	pagination,
	search = true,
	contextMenu,
	advancedSearch,
	...props
}: IndexTableTemplateProps) => {
	return (
		<Table.Section { ...props }>
			<Table.TableProvider
				selectable
				model={ model }
				rows={ rows }
				pagination={ pagination }
			>
				<TableTitleSection contextMenu={ contextMenu }>
					{ search && <Table.SearchInput advancedSearch={ advancedSearch } /> }
				</TableTitleSection>

				{ children }

				<Table.Pagination />
			</Table.TableProvider>
		</Table.Section>
	)
}

export default IndexTableTemplate
