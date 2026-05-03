import { Table } from "@/components"

import { IndexTableTitleSection, type IndexTableTitleSectionProps } from "../TableTitleSection"

interface IndexTableTemplateProps extends IndexTableTitleSectionProps {
	model: string
	rows: Record<string, any>[]
	pagination: Schema.Pagination
	search?: boolean
	advancedSearch?: React.ReactNode
	actions?: React.ReactNode
	searchPlaceholder?: string
}

const IndexTableTemplate = ({
	children,
	model,
	rows,
	pagination,
	search = true,
	contextMenu,
	advancedSearch,
	actions,
	searchPlaceholder,
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
				<IndexTableTitleSection contextMenu={ contextMenu }>
					{ search && <Table.SearchInput advancedSearch={ advancedSearch } placeholder={ searchPlaceholder } /> }
				</IndexTableTitleSection>

				{ children }

				<Table.Pagination />
			</Table.TableProvider>
		</Table.Section>
	)
}

export { IndexTableTemplate }
