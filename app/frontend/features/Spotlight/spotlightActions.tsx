import { router } from "@inertiajs/react"
import { type SpotlightActionData } from "@mantine/spotlight"

import {
	DashboardIcon,
	MembersIcon,
	OrgsIcon,
	PresentationIcon,
	SearchIcon,
	SettingsIcon,
	ThemesIcon,
	UserGroupIcon,
} from "@/components/Icons"
import { Routes } from "@/lib"
import { i18n } from "@/lib/i18n"
import { type SpotlightSearchValues } from "@/queries/spotlight"

function matchesQuery(value: string | undefined, query: string) {
	if(!value) return false

	return value.toLowerCase().includes(query.toLowerCase().trim())
}

function filterRecords<T>(
	records: T[],
	query: string,
	fields: (keyof T)[],
) {
	const trimmedQuery = query.trim()
	if(trimmedQuery === "") return records

	return records.filter((record) => fields.some((field) => {
		const value = record[field]
		return typeof value === "string" && matchesQuery(value, trimmedQuery)
	}))
}

export function filterSpotlightValues(values: SpotlightSearchValues, query: string): SpotlightSearchValues {
	const trimmedQuery = query.trim()
	if(trimmedQuery === "") return values

	return {
		orgs: filterRecords(values.orgs, query, ["name", "description", "slug"]),
		themes: filterRecords(values.themes, query, ["name", "slug", "status"]),
		memberships: values.memberships.filter((membership) => (
			matchesQuery(membership.name, trimmedQuery) ||
			matchesQuery(membership.number, trimmedQuery) ||
			matchesQuery(membership.slug, trimmedQuery) ||
			matchesQuery(membership.person.name, trimmedQuery)
		)),
		templates: filterRecords(values.templates, query, ["name", "slug"]),
		presentations: values.presentations.filter((presentation) => (
			matchesQuery(presentation.name, trimmedQuery) ||
			matchesQuery(presentation.slug, trimmedQuery) ||
			matchesQuery(presentation.theme.name, trimmedQuery)
		)),
	}
}

export function buildDefaultActions(circleSlug: string | undefined): SpotlightActionData[] {
	const t = i18n.t.bind(i18n)
	const actions: SpotlightActionData[] = [
		{
			id: "circles",
			label: t("spotlight.giving_circles"),
			description: t("spotlight.giving_circles_description"),
			group: t("spotlight.navigation"),
			onClick: () => router.get(Routes.circles()),
			leftSection: <DashboardIcon size={ 18 } />,
		},
		{
			id: "settings",
			label: t("spotlight.settings"),
			description: t("spotlight.settings_description"),
			group: t("spotlight.settings"),
			onClick: () => router.get(Routes.settingsGeneral()),
			leftSection: <SettingsIcon size={ 18 } />,
		},
	]

	if(!circleSlug) return actions

	return [
		{
			id: "circle-dashboard",
			label: t("spotlight.circle_dashboard"),
			description: t("spotlight.circle_dashboard_description"),
			group: t("spotlight.circle"),
			onClick: () => router.get(Routes.circle(circleSlug)),
			leftSection: <DashboardIcon size={ 18 } />,
		},
		{
			id: "memberships",
			label: t("navigation.members"),
			description: t("spotlight.members_description"),
			group: t("spotlight.circle"),
			onClick: () => router.get(Routes.circleMemberships(circleSlug)),
			leftSection: <UserGroupIcon size={ 18 } />,
		},
		{
			id: "orgs",
			label: t("navigation.orgs"),
			description: t("spotlight.orgs_description"),
			group: t("spotlight.circle"),
			onClick: () => router.get(Routes.circleOrgs(circleSlug)),
			leftSection: <OrgsIcon size={ 18 } />,
		},
		{
			id: "templates",
			label: t("spotlight.presentation_templates"),
			description: t("spotlight.presentation_templates_description"),
			group: t("spotlight.circle"),
			onClick: () => router.get(Routes.circleTemplates(circleSlug)),
			leftSection: <PresentationIcon size={ 18 } />,
		},
		{
			id: "themes",
			label: t("navigation.themes"),
			description: t("spotlight.themes_description"),
			group: t("spotlight.circle"),
			onClick: () => router.get(Routes.circleThemes(circleSlug)),
			leftSection: <ThemesIcon size={ 18 } />,
		},
		...actions,
	]
}

export function generateSearchActions(
	values: SpotlightSearchValues | undefined,
	circleSlug: string,
): SpotlightActionData[] {
	if(!values) return []

	const t = i18n.t.bind(i18n)

	return [
		...values.orgs.map((org) => ({
			id: `org-${org.id}`,
			label: org.name,
			description: org.description || org.slug,
			group: t("navigation.orgs"),
			onClick: () => router.get(Routes.org(circleSlug, org.slug)),
			leftSection: <OrgsIcon size={ 18 } />,
			keywords: ["org", "orgs", "organization"],
		})),
		...values.themes.map((theme) => ({
			id: `theme-${theme.id}`,
			label: theme.name,
			description: theme.status,
			group: t("navigation.themes"),
			onClick: () => router.get(Routes.theme(circleSlug, theme.slug)),
			leftSection: <ThemesIcon size={ 18 } />,
			keywords: ["theme", "themes"],
		})),
		...values.memberships.map((membership) => ({
			id: `membership-${membership.id}`,
			label: membership.name,
			description: membership.person.name,
			group: t("navigation.members"),
			onClick: () => router.get(Routes.membership(circleSlug, membership.slug)),
			leftSection: <MembersIcon size={ 18 } />,
			keywords: ["member", "members", "membership"],
		})),
		...values.templates.map((template) => ({
			id: `template-${template.id}`,
			label: template.name || template.slug,
			description: template.slug,
			group: t("templates.index.breadcrumbs.templates"),
			onClick: () => router.get(Routes.circleTemplate(circleSlug, template.slug)),
			leftSection: <PresentationIcon size={ 18 } />,
			keywords: ["template", "templates"],
		})),
		...values.presentations.map((presentation) => ({
			id: `presentation-${presentation.id}`,
			label: presentation.name,
			description: presentation.theme.name,
			group: t("presentations.index.breadcrumbs.presentations"),
			onClick: () => router.get(Routes.themePresentation(circleSlug, presentation.theme.slug, presentation.slug)),
			leftSection: <PresentationIcon size={ 18 } />,
			keywords: ["presentation", "presentations"],
		})),
	]
}

export function buildSpotlightActions(
	query: string,
	circleSlug: string | undefined,
	values: SpotlightSearchValues | undefined,
): SpotlightActionData[] {
	if(query.trim() === "" || !circleSlug) {
		return buildDefaultActions(circleSlug)
	}

	if(!values) return []

	const filteredValues = filterSpotlightValues(values, query)
	return generateSearchActions(filteredValues, circleSlug)
}

export { SearchIcon }
