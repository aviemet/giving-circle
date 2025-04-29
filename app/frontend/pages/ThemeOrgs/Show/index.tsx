import React from "react"

import { Title, Menu, Page, Section, Text, Money } from "@/components"
import { Routes } from "@/lib"
import { usePageProps } from "@/lib/hooks"

interface ShowThemeOrgProps {
	org: Schema.ThemesOrgsShow
}

// @path: /:circle_slug/themes/:theme_slug/orgs/:slug
// @route: themeOrg
const ShowThemeOrg = ({ org }: ShowThemeOrgProps) => {
	const { params } = usePageProps<"themeOrg">()
	const title = org.name || "Org"

	return (
		<Page
			title={ title }
			siteTitle={ <><Title>{ title }</Title><Menu position="bottom-end">
				<Menu.Target />
				<Menu.Dropdown>
					<Menu.Link
						href={ Routes.editThemeOrg(params.circle_slug, params.theme_slug, params.slug) }
					>
						Edit Org
					</Menu.Link>
				</Menu.Dropdown>
			</Menu></> }>
			<Section>

				<Text>Asking: <Money>{ org.ask }</Money></Text>

				<Text>{ org.description }</Text>
			</Section>
		</Page>
	)
}

export default ShowThemeOrg
