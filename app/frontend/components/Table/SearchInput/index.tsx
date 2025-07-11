import { type VisitOptions } from "@inertiajs/core"
import { router } from "@inertiajs/react"
import { Box } from "@mantine/core"
import { useSessionStorage } from "@mantine/hooks"
import { debounce } from "lodash"
import React, { useEffect } from "react"

import { SearchIcon } from "@/components/Icons"
import { TextInput } from "@/components/Inputs"
import { useInit, useLocation } from "@/lib/hooks"

import ColumnPicker from "./ColumnPicker"
import { useTableContext } from "../TableContext"
import AdvancedSearch from "./AdvancedSearch"
import * as classes from "../Table.css"

interface SearchInputProps {
	columnPicker?: boolean
	advancedSearch?: React.ReactNode
	placeholder?: string
}

/**
 * Performs an Inertia request to the current url (window.location), using the search params
 * as query string with the key of 'search'
 */
const SearchInput = ({ columnPicker = true, advancedSearch, placeholder = "Search" }: SearchInputProps) => {
	const { tableState: { model }, setTableState } = useTableContext()

	const location = useLocation()
	const [searchValue, setSearchValue] = useSessionStorage({
		key: `${model ?? "standard"}-query`,
		defaultValue: location.params.get("search") || "",
		getInitialValueInEffect: false,
	})

	useInit(() => {
		const urlSearchString = location.params.get("search")

		// On first render, use URL search param as search value.
		// This should only trigger on page load when directly visited via a shared link e.g.
		if(urlSearchString) {
			// Doesn't trigger a server visit due to checks in the other useEffect
			setSearchValue(urlSearchString)
			return
		}

		// Only persist search parameter for tables scoped to a model
		if(model && searchValue) {
			setTableState({ searching: true })
			setSearchValue(searchValue)
		}
	})

	const debouncedSearch = debounce((path) => {
		const options: VisitOptions = {
			replace: true,
			preserveScroll: true,
			preserveState: true,
			onStart: () => {
				setTableState({ searching: true })
			},
			onSuccess: () => {
				setTableState({ searching: false })
			},
		}

		if(model) options.only = [model, "pagination"]

		router.get(path, {}, options)
	}, 500)

	useEffect(() => {
		const url = new URL(window.location.href)

		if(
			url.searchParams.get("search") === searchValue ||
			(url.searchParams.get("search") === null && searchValue === "")
		) return

		if(searchValue === "") {
			url.searchParams.delete("search")
		} else {
			url.searchParams.set("search", searchValue ?? "")
			url.searchParams.delete("page")
		}

		debouncedSearch(url.toString())
		// debouncedSearch is not memoized, therefore not stable.
		// Including it would cause an infinite re-render loop.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue])

	return (
		<Box className={ classes.searchWrapper }>
			{ advancedSearch && <AdvancedSearch>{ advancedSearch }</AdvancedSearch> }
			<TextInput
				name="search"
				id="search"
				clearable
				value={ searchValue }
				onChange={ e => {
					setSearchValue(e.target.value)
				} }
				leftSection={ <SearchIcon size={ 16 } /> }
				leftSectionPointerEvents="none"
				className={ classes.searchInput }
				wrapper={ false }
				aria-label={ placeholder }
				placeholder={ placeholder }
				radius="xl"
				size="sm"
			/>
			{ columnPicker && <ColumnPicker /> }
		</Box>
	)
}

export default SearchInput
