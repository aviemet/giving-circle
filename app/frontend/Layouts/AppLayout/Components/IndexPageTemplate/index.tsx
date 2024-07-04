import React from 'react'
import { Page, Table, type PageProps } from '@/Components'
import TableTitleSection, { IndexTableTitleSectionProps } from './TableTitleSection'
import { type Breadcrumb } from '@/Components/Breadcrumbs'

interface IndexPageTemplateProps
	extends IndexTableTitleSectionProps, Omit<PageProps, 'children'|'title'> {
	model: string
	rows: Record<string, any>[]
	pagination: Schema.Pagination
	search?: boolean
	advancedSearch?: React.ReactNode
	breadcrumbs?: Breadcrumb[]
}

const IndexPageTemplate = ({
	children,
	title,
	model,
	rows,
	pagination,
	search = true,
	menuOptions,
	advancedSearch,
	breadcrumbs,
	deleteRoute,
	navMenu,
	hideNavMenu,
	meta,
}: IndexPageTemplateProps) => {
	return (
		<Page
			title={ title }
			navMenu={ navMenu }
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
					<TableTitleSection title={ title } menuOptions={ menuOptions } deleteRoute={ deleteRoute }>
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
