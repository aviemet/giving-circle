import Papa from 'papaparse'
import { has } from 'lodash'

interface AcceptedHeading {
	name: string
	forms: string[]
	type?: (value: unknown) => unknown
}

interface HeadingMap {
	[key: string]: {
		name: string
		type?: (value: unknown) => unknown
	}
}

interface Callbacks {
	beforeInferHeadings?: (headings: string[]) => void
	afterInferHeadings?: (headingsMap: HeadingMap) => void
	beforeRowParse?: (rowData: Record<string, unknown>) => void
	afterRowParse?: (row: Record<string, unknown>) => void
	onComplete?: (data: Record<string, unknown>[], headers?: string[]) => void
}

const inferHeadings = (headings: string[], acceptedHeadings: AcceptedHeading[], callbacks: Callbacks): HeadingMap => {
	callbacks?.beforeInferHeadings?.(headings)

	const headingsMap = headings.reduce((acc, heading) => {
		const matchKey = heading.trim().toLowerCase()
		const match = acceptedHeadings.find(ah => ah.forms.includes(matchKey))
		if(match) {
			acc[heading] = { name: match.name, type: match.type }
		}
		return acc
	}, {} as HeadingMap)

	callbacks?.afterInferHeadings?.(headingsMap)

	return headingsMap
}

export const parseCsvFile = (
	file: File,
	callbacks: Callbacks,
	acceptedHeadings?: AcceptedHeading[],
) => {
	let headings: HeadingMap | null = null
	const data: Record<string, unknown>[] = []
	let headers: string[] = []

	Papa.parse<Record<string, unknown>>(file, {
		header: true,
		delimiter: ',',
		dynamicTyping: true,
		skipEmptyLines: true,
		step: ({ data: rowData, errors, meta }) => {

			if(!headings) {
				headers = meta.fields?.filter(Boolean) || []
				headings = acceptedHeadings ? inferHeadings(headers, acceptedHeadings, callbacks) : null
			}

			callbacks?.beforeRowParse?.(rowData)

			const row = headings
				? Object.entries(rowData).reduce((acc, [key, value]) => {
					if(has(headings, key)) {
						const { name, type } = headings[key]
						acc[name] = type ? type(value) : value
					}
					return acc
				}, {} as Record<string, unknown>)
				: rowData

			callbacks?.afterRowParse?.(row)
			data.push(row)
		},
		complete: () => callbacks?.onComplete?.(data, headers),
	})

	return data
}
