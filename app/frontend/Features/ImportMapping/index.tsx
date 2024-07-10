import React, { useState, useEffect, useImperativeHandle } from 'react'
import { Table, Paper, Text, Box, Flex, Badge } from '@/Components'
import { Select } from '@/Components/Inputs'
import { useInit } from '@/lib/hooks'

import cx from 'clsx'

interface MappingItem {
	name: string
	label: string
	forms: string[]
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

interface ImportMappingProps {
	headings: string[]
	values: Record<string, any>[]
	mapping: MappingItem[]
	headingMapState: [
		state: Record<string, string>,
		setter: React.Dispatch<React.SetStateAction<Record<string, string>>>
	]
	triggerAcceptRef: React.Ref<TriggerHandle>
	triggerCancelRef: React.Ref<TriggerHandle>
	// sanitize?: (row: Record<string, any>) => Record<string, any>
	// onImport: (data: Record<string, any>[]) => void
}

const ImportMapping = ({
	headings,
	values = [],
	mapping,
	headingMapState: [headingMap, setHeadingMap],
	triggerAcceptRef,
	triggerCancelRef,
}: ImportMappingProps) => {
	const [errors, setErrors] = useState<ErrorItem[][]>([])

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

	useImperativeHandle(triggerAcceptRef, () => ({
		trigger() {
			console.log('Accept Triggered')
		},
	}))

	const handleAcceptAction = () => {
		const batchErrors: ErrorItem[][] = []

		const validatedData = values.map((value, i) => {
			const row: Record<string, any> = {}

			for(const [csvHeading, dbField] of Object.entries(headingMap)) {
				if(dbField === '') continue

				const headingMapForType = headingsMap.find(map => map.name === headingMap[csvHeading])
				const cellValue = headingMapForType?.type ? headingMapForType.type(value[csvHeading]) : value[csvHeading]

				row[dbField] = cellValue
			}

			let sanitizedRow = row
			if(sanitize) {
				sanitizedRow = sanitize(row)
			}

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
			onImport(validatedData)
		}
	}

	useImperativeHandle(triggerCancelRef, () => ({
		trigger() {
			console.log('Cencel Triggered')
		},
	}))

	const handleCancelAction = () => {
		// setPendingOrgs([])
		// setPendingHeadings([])
		// setDisplayImportTable(false)
	}

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
								<Table.Cell colSpan={ values.length }>
									<Text>
                    There were errors in the data provided which prevented them from being saved. Please check the data and upload again.
									</Text>
								</Table.Cell>
							</Table.Row>
						) }
					</Table.Head>
					<Table.Body>
						{ values.map((org, i) => (
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
										<Table.Cell colSpan={ values.length }>
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
