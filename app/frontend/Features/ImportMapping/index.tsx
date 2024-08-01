import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Table, Paper, Text, Box, Flex, Badge } from '@/Components'
import { Select } from '@/Components/Inputs'
import { useInit } from '@/lib/hooks'

import cx from 'clsx'

/**
 * CSV File Import Key
 */
export interface MappingItem {
	/**
	 * The new key name to assign to the corresponding old key.
	 */
	name: string

	/**
	 * The label used for displaying in UI dropdowns.
	 */
	label: string

	/**
	 * List of potential values that the old key can have for matching to this rule.
	 */
	forms: string[]

	/**
	 * Optional function to coerce and transform values associated with the old key.
     * @param value The value associated with the old key to be transformed.
     * @returns The transformed value to assign to the new key.
	 */
	type?: (value: any) => any
}

interface ErrorItem {
	name: string
	type: string
	message: string
}

export interface TriggerHandle {
	trigger: () => void
}

export const triggerRefAction = (ref: React.RefObject<TriggerHandle>) => {
	ref?.current?.trigger()
}

interface ImportMappingProps<T = Record<string, unknown>> {
	headings: string[]
	rows: T[]
	mapping: MappingItem[]
	triggerAcceptRef: React.Ref<TriggerHandle>
	triggerCancelRef: React.Ref<TriggerHandle>
	validate?: (row: T) => T
	onAccept?: (data: Record<string, unknown>[]) => void
	onCancel?: () => void
}

const ImportMapping = <T extends Record<string, unknown>>({
	headings,
	rows = [],
	mapping,
	triggerAcceptRef,
	triggerCancelRef,
	validate,
	onAccept,
	onCancel,
}: ImportMappingProps<T>) => {
	const [headingMap, setHeadingMap] = useState<Record<string, string>>({})

	/**
	 * Map headings from imported file to database field names
	 */

	const alternateForm = (heading: string): string | undefined => {
		return mapping.find(m => m.forms.includes(heading.toLowerCase()))?.name
	}

	useInit(() => {
		const map: Record<string, string> = {}
		headings.forEach(heading => {
			const inferredHeading = alternateForm(heading)
			map[heading] = inferredHeading || ''
		})
		setHeadingMap(map)
	})

	const handleSelectChange = (value: string | null, heading: string) => {
		if(value === null) return

		setHeadingMap(prevState => {
			const newState = { ...prevState }
			for(const [csvHeading, dbField] of Object.entries(newState)) {
				if(dbField === value) {
					newState[csvHeading] = ''
				}
			}
			newState[heading] = value
			return newState
		})
	}

	/**
	 * Validate and pass rows to Accept action
	 */

	useImperativeHandle(triggerAcceptRef, () => ({
		trigger() {
			handleAcceptAction?.()
		},
	}))

	const [errors, setErrors] = useState<ErrorItem[][]>([])

	const rewriteRowKey = (row: T, headingsArray: [string, string][]) => {
		const newRow: Record<keyof typeof headingMap, unknown> = {}

		for(const [fromKey, toKey] of headingsArray) {
			if(toKey === '') continue

			const headingMapForType = mapping.find(map => map.name === headingMap[fromKey])
			const cellValue = headingMapForType?.type ?
				headingMapForType.type(row[fromKey])
				:
				row[fromKey]

			newRow[toKey] = cellValue
		}

		return newRow
	}

	const handleAcceptAction = () => {
		const batchErrors: ErrorItem[][] = []

		const headingsArray = Object.entries(headingMap)

		const validatedData = rows.map((row, i) => {
			const rowWithMappedKey = rewriteRowKey(row, headingsArray)


			let sanitizedRow = rowWithMappedKey
			// if(sanitize) {
			// 	sanitizedRow = sanitize(row)
			// }

			// if(!context.validate(sanitizedRow)) {
			// 	batchErrors[i] = context.validationErrors().map(({ name, type }) => ({
			// 		name,
			// 		type,
			// 		message: context.keyErrorMessage(name),
			// 	}))
			// }

			return sanitizedRow
		})

		if(batchErrors.length > 0) {
			setErrors(batchErrors)
		} else {
			onAccept?.(validatedData)
		}
	}

	useImperativeHandle(triggerCancelRef, () => ({
		trigger() {
			onCancel?.()
		},
	}))

	useEffect(() => {
		if(errors.length > 0) console.error({ errors })
	}, [errors])

	useEffect(() => {
		setErrors([])
	}, [headingMap])

	return (
		<Box>
			<Paper>
				<Table wrapper={ false }>
					<Table.Head>
						<Table.Row>
							<Table.HeadCell className={ cx('align-bottom', 'center') }>#</Table.HeadCell>
							<>{ headings.map((heading, i) => (
								<Table.HeadCell key={ i }>
									<Flex mb="xs" align="center" style={ { whiteSpace: 'nowrap' } }>
										<Text>Import</Text>
										<Badge radius="xs" size="xs" mx="xs">{ heading }</Badge>
										<Text>As</Text>
									</Flex>
									<Select
										options={ [
											{ value: '', label: 'Do Not Import' },
											...mapping.map(h => ({ value: h.name, label: h.label })),
										] }
										value={ headingMap[heading] }
										onChange={ (value) => handleSelectChange(value, heading) }
										placeholder="Select mapping"
									/>
								</Table.HeadCell>
							)) }</>
						</Table.Row>
						{ errors.length > 0 && (
							<Table.Row>
								<Table.Cell colSpan={ rows.length }>
									<Text>
										There were errors in the data provided which prevented them from being saved. Please check the data and upload again.
									</Text>
								</Table.Cell>
							</Table.Row>
						) }
					</Table.Head>
					<Table.Body>
						{ rows.map((org, i) => (
							<React.Fragment key={ i }>
								<Table.Row>
									<Table.Cell className={ cx('align-middle') }>
										<Text m="xs">{ i }</Text>
									</Table.Cell>
									<>{ headings.map((heading, j) => {
										const headingMapForType = mapping.find(map => map.name === headingMap[heading])
										const cellValue = headingMapForType?.type ? headingMapForType.type(org[heading]) : org[heading]

										const error = errors[i] && errors[i].find(error => error.name === headingMapForType?.name)

										if(error) console.log({ org, i, heading, headingMapForType, error: errors[i] })

										return (
											<Table.Cell key={ `${j}-${heading}` } className={ cx({ error }) }>{ `${cellValue}` }</Table.Cell>
										)
									}) }</>
								</Table.Row>
								{ errors[i] && (
									<Table.Row>
										<Table.Cell colSpan={ rows.length }>
											<Box>
												<Text>Errors:</Text>
												<ul>
													{ errors[i].map((error, k) => <li key={ k }>{ error.message }</li>) }
												</ul>
											</Box>
										</Table.Cell>
									</Table.Row>
								) }
							</React.Fragment>
						)) }
					</Table.Body>
				</Table>
			</Paper>
		</Box>
	)
}

export default ImportMapping
