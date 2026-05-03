import { useAdvancedSearch } from "../useAdvancedSearch"

export interface AdvancedInputProps {
	advancedSearch: ReturnType<typeof useAdvancedSearch>
	name: string
}

export { SearchDateTypeInput } from "./Type"
export { Date as SearchDateInput } from "./Date"
