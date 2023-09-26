import useAdvancedSearch from '../useAdvancedSearch'

export interface IAdvancedInputProps {
	advancedSearch: ReturnType<typeof useAdvancedSearch>
	name: string
}

export { default as SearchDateTypeInput } from './Type'
export { default as SearchDateInput } from './Date'
