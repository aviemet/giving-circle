import { useMemo } from "react"

const useCheckboxState = (length: number, selected: number) => {
	return useMemo(() => {
		// No elements
		if(length === 0) {
			return { allChecked: false, indeterminate: false }
		}

		// All selected
		if(selected === length) {
			return { allChecked: true, indeterminate: false }
		}

		// Nothing selected
		if(selected === 0) {
			return { allChecked: false, indeterminate: false }
		}

		// Some selected
		return { allChecked: false, indeterminate: true }
	}, [length, selected])
}

export default useCheckboxState
