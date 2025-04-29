import { StateCreator } from "zustand"

export interface TableSlice {
	defaults: {
		tableRecordsLimit: number
	}
}

export const createTableSlice: StateCreator<TableSlice, [], [], TableSlice> = (set) => ({
	defaults: {
		tableRecordsLimit: 25,
	},
})
