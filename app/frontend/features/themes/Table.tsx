import { Table, Link } from "@/components"
import { EditButton } from "@/components/Button"
import { type TableProps } from "@/components/Table/Table"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

const ThemeTable = (props: TableProps) => {
	const { params } = usePageProps<"circleThemes">()
	return (
		<Table { ...props }>
			<Table.Head>
				<Table.Row>
					<Table.Cell sort="title">Title</Table.Cell>
					<Table.Cell sort="slug">Slug</Table.Cell>
					<Table.Cell fitContent>Actions</Table.Cell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				<Table.RowIterator render={ (theme: Schema.ThemesIndex) => (
					<Table.Row key={ theme.id }>
						<Table.Cell>
							<Link href={ Routes.theme(params.circle_slug, theme.slug) }>{ theme.name }</Link>
						</Table.Cell>
						<Table.Cell>
							<Link href={ Routes.theme(params.circle_slug, theme.slug) }>{ theme.slug }</Link>
						</Table.Cell>
						<Table.Cell>
							<EditButton href={ Routes.editTheme(params.circle_slug, theme.slug) } />
						</Table.Cell>
					</Table.Row>
				) } />
			</Table.Body>
		</Table>
	)
}

export default ThemeTable
