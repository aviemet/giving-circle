import React, { useState, useEffect, useRef, useMemo } from 'react'
import { parseCsvFile } from '@/lib/papaParse'
import { Button, Code, Dropzone, Page, Text, Title, type FileWithPath } from '@/Components'
import ImportMapping, { TriggerHandle, triggerRefAction } from '@/Features/ImportMapping'
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

	const acceptButtonRef = useRef<TriggerHandle>(null)
	const cancelButtonRef = useRef<TriggerHandle>(null)

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

	const siteTitle = useMemo(() => {
		if(!displayImportTable) return undefined

		return <>
			<Title>Orgs Import</Title>
			<Button onClick={ () => triggerRefAction(acceptButtonRef) }>Accept</Button>
			<Button onClick={ () => triggerRefAction(cancelButtonRef) } color="red">Cancel</Button>
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
					triggerAcceptRef={ acceptButtonRef }
					triggerCancelRef={ cancelButtonRef }
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
