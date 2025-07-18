import { router } from "@inertiajs/react"
import { Select, type SelectProps } from "@mantine/core"
import clsx from "clsx"

import { useLocation, usePageProps } from "@/lib/hooks"
import { useUpdateTablePreferences } from "@/queries"
import useLayoutStore from "@/store/LayoutStore"


import * as classes from "../Table.css"

interface LimitSelectProps extends SelectProps {
	pagination: Schema.Pagination
	model: string
}

const LimitSelect = ({ pagination, model }: LimitSelectProps) => {
	const { auth: { user } } = usePageProps()
	const location = useLocation()
	const defaultLimit = useLayoutStore(state => state.defaults.tableRecordsLimit)
	const mutate = useUpdateTablePreferences({ params: { userId: user.id } })

	const handleLimitChange = (limit: string | null) => {
		if(!model || !user) return

		limit ||= String(defaultLimit)

		mutate.mutate({
			[model]: { limit },
		}, {
			onSuccess: () => {
				// Redirect to first page if new limit puts page out of bounds of records
				if(parseInt(limit) * (pagination.current_page - 1) > pagination.count) {
					location.params.delete("page")
					router.get(
						location.path,
						{ ...location.paramsAsJson },
						{ preserveScroll: true },
					)
				} else {
					router.reload()
				}
			},
		})
	}

	return (
		<Select
			variant="filled"
			mx={ 4 }
			my={ 0 }
			withCheckIcon={ false }
			className={ clsx(classes.limitSelect) }
			rightSectionWidth="1rem"
			defaultValue={ String(pagination.limit) || String(defaultLimit) }
			data={ [
				{ value: "10", label: "10" },
				{ value: "15", label: "15" },
				{ value: "25", label: "25" },
				{ value: "50", label: "50" },
				{ value: "100", label: "100" },
			] }
			onChange={ handleLimitChange }
			aria-label="rows per page"
		/>
	)
}

export default LimitSelect
