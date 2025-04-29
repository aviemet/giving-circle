import React from "react"

import { Page } from "@/components"
import { NewIcon } from "@/components/Icons"
import { IndexTableTemplate } from "@/features"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

import PresentationsTable from "../Table"

interface PresentationIndexProps {
	presentations: Schema.PresentationsIndex[]
	pagination: Schema.Pagination
	circle: Schema.CirclesInertiaShare
	theme: Schema.ThemesInertiaShare
}

// @path: /:circle_slug/themes/:theme_slug/presentations
// @route: themePresentations
const PresentationsIndex = ({ presentations, pagination, circle, theme }: PresentationIndexProps) => {
	const { params } = usePageProps<"themePresentations">()

	return (
		<Page
			title="Presentations"
		>
			<IndexTableTemplate
				model="presentations"
				rows={ presentations }
				pagination={ pagination }
			// contextMenu={ {
			// 	options: [
			// 		{ label: 'New Presentation', href: Routes.newCircleThemePresentation(params.circle_slug, params.theme_slug), icon: <NewIcon /> },
			// 	],
			// } }
			>
				<PresentationsTable />
			</IndexTableTemplate>
		</Page>
	)
}

export default PresentationsIndex
