import React, { useState, useEffect, useRef, useMemo } from 'react'
import { parseCsvFile } from '@/lib/papaParse'
import { Button, Code, Dropzone, Page, Text, Title } from '@/Components'
import { ImportMapping } from '@/Features'
import { type FileWithPath } from '@mantine/dropzone'
import { getThemeMenu } from '@/Layouts/AppLayout/AppSidebar/menus'
import { useLayoutStore } from '@/Store'
import { headingsMap } from './headingsMap'

interface OrgsImportProps {
	theme: Schema.ThemesShallow
	circle: Schema.CirclesShare
}

const OrgsImport = ({ circle, theme }: OrgsImportProps) => {
	const { sidebarVisible, toggleSidebarOpen } = useLayoutStore()
	const [displayImportTable, setDisplayImportTable] = useState(false)

	const [pendingOrgs, setPendingOrgs] = useState<Record<string, unknown>[]>([])
	const [pendingHeadings, setPendingHeadings] = useState<string[]>([])
	const [headingMap, setHeadingMap] = useState<Record<string, string>>({})

	const handleFileInputChange = (files: FileWithPath[]) => {
		const file = files[0]

		parseCsvFile(file, {
			onComplete: (data, headers) => {
				setPendingOrgs(data)

				if(headers){
					setPendingHeadings(headers)
				}

				setDisplayImportTable(true)
			},
		})
	}

	useEffect(() => {
		if(displayImportTable && sidebarVisible) {
			toggleSidebarOpen(false)
		} else {
			toggleSidebarOpen(true)
		}
	}, [displayImportTable])

	const handleImportData = (data: Record<string, any>[]) => {
		data.forEach(datum => {
			// const { error, response } = OrganizationMethods.create.call(Object.assign({ theme: themeId }, datum))
		// 	if(error) {
		// 		enqueueSnackbar('Error importing organizations', { variant: 'error' })
		// 		console.error({ error })
		// 	}
		})
		// enqueueSnackbar(`${data.length} Organization${ data.length === 1 ? '' : 's'} imported`, { variant: 'success' })
		// history.push(`/admin/${themeId}/orgs`)
	}

	const handleAcceptAction = () => {
		const batchErrors: ErrorItem[][] = []

		const validatedData = values.map((value, i) => {
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

	const handleCancelAction = () => {
		setPendingOrgs([])
		setPendingHeadings([])
		setDisplayImportTable(false)
	}

	const siteTitle = useMemo(() => {
		if(!displayImportTable) return undefined

		return <>
			<Title>Orgs Import</Title>
			<Button onClick={ handleAcceptAction }>Accept</Button>
			<Button onClick={ handleCancelAction } color="red">Cancel</Button>
		</>
	}, [displayImportTable])

	return (
		<Page
			title="Orgs Import"
			siteTitle={ siteTitle }
			navMenu={ getThemeMenu({ circle, theme }) }
		>
			{ displayImportTable ? (
				<ImportMapping
					headings={ pendingHeadings }
					values={ pendingOrgs }
					mapping={ headingsMap }
					headingMapState={ [headingMap, setHeadingMap] }
					// onImport={ handleImportData }
				/>
			)
				:
				<>
					<Text mb="sm">Import a <Code>.csv</Code> file with the organization details for this theme. You can click in the space below or drag and drop the file.</Text>
					<Text mb="sm">The file should contain the organizations&apos; name, grant request amount, and an optional brief description</Text>
					<Dropzone onDrop={ handleFileInputChange } h="100%" />
				</>
			}
		</Page>
	)
}

export default OrgsImport
