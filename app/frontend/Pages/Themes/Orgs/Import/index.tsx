import React, { useState, useEffect, useRef, useMemo } from 'react'
import { parseCsvFile } from '@/lib/papaParse'
import { Button, Code, Dropzone, Page, Text, Title, type FileWithPath } from '@/Components'
import ImportMapping, { TriggerHandle, triggerRefAction } from '@/Features/ImportMapping'
import { useLayoutStore } from '@/Store'
import { headingsMap } from './headingsMap'
import { Routes } from '@/lib'
import { usePageProps } from '@/lib/hooks'
import { router } from '@inertiajs/react'

interface OrgsImportProps {
	theme: Schema.ThemesInertiaShare
	circle: Schema.CirclesInertiaShare
}

// @path: /:circle_slug/themes/:theme_slug/orgs/import
// @route: themeOrgsImport
const OrgsImport = ({ circle, theme }: OrgsImportProps) => {
	const { params } = usePageProps<'circleThemeOrgsImport'>()

	const { sidebarVisible, toggleSidebarOpen } = useLayoutStore()
	const [displayImportTable, setDisplayImportTable] = useState(false)

	const [pendingOrgs, setPendingOrgs] = useState<Record<string, unknown>[]>([])
	const [pendingHeadings, setPendingHeadings] = useState<string[]>([])

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
		// In this case, adding the extra deps causes this useEffect to malfunction
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [displayImportTable])

	const handleImportData = (data: Record<string, unknown>[]) => {
		router.post(
			Routes.circleThemeOrgs(params.circle_slug, params.theme_slug),
			// @ts-ignore
			{ orgs: data },
			{
				onSuccess: () => {
					toggleSidebarOpen(true)
				},
			},
		)
	}

	const handleCancel = () => {
		setPendingOrgs([])
		setPendingHeadings([])
		setDisplayImportTable(false)
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
		>
			{ displayImportTable ? (
				<ImportMapping
					headings={ pendingHeadings }
					rows={ pendingOrgs }
					mapping={ headingsMap }
					triggerAcceptRef={ acceptButtonRef }
					triggerCancelRef={ cancelButtonRef }
					onAccept={ handleImportData }
					onCancel={ handleCancel }
				/>
			)
				:
				<>
					<Text mb="sm">Import a <Code>.csv</Code> file containing the nominee organization details for this theme. You can click in the space below or drag and drop the file.</Text>
					<Text mb="sm">The file should contain the organizations&apos; name, grant request amount, and an optional brief description</Text>
					<Dropzone onDrop={ handleFileInputChange } h="100%" />
				</>
			}
		</Page>
	)
}

export default OrgsImport
