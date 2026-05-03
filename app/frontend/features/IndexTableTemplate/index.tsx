import { Table } from "@/components"

import { IndexTableTitleSection, type IndexTableTitleSectionProps } from "./TableTitleSection"

interface IndexTableTemplateProps extends IndexTableTitleSectionProps {
	model: string
	pagination: Schema.Pagination
	search?: boolean
	advancedSearch?: React.ReactNode
	searchPlaceholder?: string
}

export function IndexTableTemplate({
	children,
	model,
	pagination,
	search = true,
	contextMenu,
	advancedSearch,
	searchPlaceholder,
}: IndexTableTemplateProps) {
	return (
		<Table.Section>
			<Table.TableProvider
				selectable
				model={ model }
				pagination={ pagination }
			>
				<IndexTableTitleSection contextMenu={ contextMenu }>
					{ search && <Table.SearchInput advancedSearch={ advancedSearch } placeholder={ searchPlaceholder } /> }
				</IndexTableTitleSection>

				{ children }

				{ pagination && <Table.Pagination /> }
			</Table.TableProvider>
		</Table.Section>
	)
}
