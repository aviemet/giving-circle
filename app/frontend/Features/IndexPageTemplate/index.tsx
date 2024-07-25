import React from 'react'
import { Page, Table, type PageProps } from '@/Components'
import TableTitleSection, { IndexTableTitleSectionProps } from '../TableTitleSection'
import { type Breadcrumb } from '@/Components/Breadcrumbs'

interface IndexPageTemplateProps
	extends
	IndexTableTitleSectionProps,
	Omit<PageProps, 'children'>
{
	title: string
	model: string
	rows: Record<string, any>[]
	pagination: Schema.Pagination
	search?: boolean
	breadcrumbs?: Breadcrumb[]
	advancedSearch?: React.ReactNode
}

const IndexPageTemplate = ({
	children,
	title,
	model,
	rows,
	pagination,
	search = true,
	breadcrumbs,
	contextMenu,
	advancedSearch,
	hideNavMenu,
	meta,

}: IndexPageTemplateProps) => {
	return (
		<Page
			title={ title }
			hideNavMenu={ hideNavMenu }
			meta={ meta }
			breadcrumbs={ breadcrumbs ?? [
				{ title, href: window.location.href },
			] }
		>
			<Table.Section>
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
		</Page>
	)
}

export default IndexPageTemplate
