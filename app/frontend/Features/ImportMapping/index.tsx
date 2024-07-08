import React, { useState, useEffect } from 'react'
import { Button, Chip, Stack, Table, Paper, Text, Box } from '@/Components'
import { Select } from '@/Components/Inputs'

interface MappingItem {
	name: string
	label: string
	forms: string[]
	type?: (value: any) => any
}

interface ImportMappingProps {
	headings: string[]
	values: Record<string, any>[]
	mapping: MappingItem[]
	schema: {
		newContext: () => SchemaContext
	}
	sanitize?: (row: Record<string, any>) => Record<string, any>
	onImport: (data: Record<string, any>[]) => void
}

interface SchemaContext {
	validate: (data: Record<string, any>) => boolean
	validationErrors: () => { name: string, type: string }[]
	keyErrorMessage: (key: string) => string
}

interface ErrorItem {
	name: string
	type: string
	message: string
}

const ImportMapping = ({ headings, values = [], mapping, schema, sanitize, onImport }: ImportMappingProps) => {
	const [errors, setErrors] = useState<ErrorItem[][]>([])

	const alternateForm = (heading: string): string | undefined => {
		return mapping.find(m => m.forms.includes(heading.toLowerCase()))?.name
	}

	const [headingMap, setHeadingMap] = useState<Record<string, string>>(() => {
		const map: Record<string, string> = {}
		headings.forEach(heading => {
			const inferredHeading = alternateForm(heading)
			map[heading] = inferredHeading || ''
		})
		return map
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

	const performImportAction = () => {
		const batchErrors: ErrorItem[][] = []

		const validatedData = values.map((value, i) => {
			const context = schema.newContext()

			const row: Record<string, any> = {}
			for(const [csvHeading, dbField] of Object.entries(headingMap)) {
				if(dbField === '') continue

				const headingMapForType = mapping.find(map => map.name === headingMap[csvHeading])
				const cellValue = headingMapForType?.type ? headingMapForType.type(value[csvHeading]) : value[csvHeading]

				row[dbField] = cellValue
			}

			let sanitizedRow = row
			if(sanitize) {
				sanitizedRow = sanitize(row)
			}

			if(!context.validate(sanitizedRow)) {
				batchErrors[i] = context.validationErrors().map(({ name, type }) => ({
					name,
					type,
					message: context.keyErrorMessage(name),
				}))
			}

			return sanitizedRow
		})

		if(batchErrors.length > 0) {
			setErrors(batchErrors)
		} else {
			onImport(validatedData)
		}
	}

	useEffect(() => {
		if(errors.length > 0) console.error({ errors })
	}, [errors])

	useEffect(() => {
		setErrors([])
	}, [headingMap])

	return (
		<Box>
			<Button onClick={ performImportAction } mb="md">Accept</Button>
			<Paper>
				<Table>
					<Table.Head>
						<Table.Row>
							{ headings.map((heading, i) => (
								<Table.HeadCell key={ i }>
									<Stack mb="sm">
										<Text>Heading From CSV:</Text>
										<Chip>{ heading }</Chip>
									</Stack>
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
							)) }
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
					<tbody>
						{ values.map((org, i) => (
							<React.Fragment key={ i }>
								<Table.Row>
									{ headings.map((heading, j) => {
										const headingMapForType = mapping.find(map => map.name === headingMap[heading])
										const cellValue = headingMapForType?.type ? headingMapForType.type(org[heading]) : org[heading]

										const error = errors[i] && errors[i].find(error => error.name === headingMapForType?.name)

										if(error) console.log({ org, i, heading, headingMapForType, error: errors[i] })

										return (
											<Table.Cell key={ `${j}-${heading}` }>{ `${cellValue}` }</Table.Cell>
										)
									}) }
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
					</tbody>
				</Table>
			</Paper>
		</Box>
	)
}

export default ImportMapping
