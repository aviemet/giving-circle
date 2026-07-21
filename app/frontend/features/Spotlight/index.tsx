import { Loader } from "@mantine/core"
import { Spotlight } from "@mantine/spotlight"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"

import { usePageProps } from "@/lib/hooks"
import { useGetSpotlightResults } from "@/queries"

import {
	SearchIcon,
	buildSpotlightActions,
	buildDefaultActions,
} from "./spotlightActions"

export function AppSpotlight() {
	const { t } = useTranslation()
	const { params, active_circle, circles } = usePageProps()
	const circleSlug = typeof params.circle_slug === "string"
		? params.circle_slug
		: active_circle?.slug ?? circles?.[0]?.slug

	const [query, setQuery] = useState("")

	const {
		data,
		refetch,
		isLoading,
		isFetching,
		isPending,
		isFetched,
		isStale,
	} = useGetSpotlightResults(
		{ circleSlug: circleSlug ?? "" },
		{ enabled: false },
	)

	const actions = useMemo(() => {
		if(query.trim() === "" || !circleSlug) {
			return buildDefaultActions(circleSlug)
		}

		if(!data) return []

		return buildSpotlightActions(query, circleSlug, data)
	}, [query, circleSlug, data])

	const handleQueryChange = (nextQuery: string) => {
		setQuery(nextQuery)

		if(nextQuery.trim() === "" || !circleSlug) return

		if(!isFetched || isStale) {
			refetch()
		}
	}

	const loading = isLoading || isFetching || isPending
	const searching = query.trim() !== "" && !!circleSlug

	return (
		<Spotlight
			actions={ actions }
			disabled={ !circleSlug && searching }
			limit={ 8 }
			nothingFound={ loading && searching ? <Loader /> : t("spotlight.nothing_found") }
			onQueryChange={ handleQueryChange }
			query={ query }
			searchProps={ {
				leftSection: <SearchIcon size={ 28 } />,
				placeholder: circleSlug ? t("spotlight.search_circle") : t("spotlight.search_select_circle"),
			} }
		/>
	)
}
