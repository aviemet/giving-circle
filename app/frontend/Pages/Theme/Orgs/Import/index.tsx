import React, { useState, useEffect, useRef } from 'react'
import { readCsv } from '@/lib/papaParse'
import { Button, Dropzone } from '@/Components'
import { FileInput, TextInput } from '@/Components/Inputs'
import { ImportMapping } from '@/Features'
import { type FileWithPath } from '@mantine/dropzone'

interface OrgsImportProps {}

const OrgsImport = (props: OrgsImportProps) => {
	const [pendingOrgs, setPendingOrgs] = useState<Record<string, unknown>[]>([])
	const [pendingHeadings, setPendingHeadings] = useState<string[]>([])

	const [ loading, setLoading ] = useState(false)

	const fileInputRef = useRef<HTMLButtonElement>(null)

	const handleFileInputChange = (files: FileWithPath[]) => {
		const file = files[0]

		// TODO: Display error message on error
		const parser = readCsv(file, {
			onComplete: (data, headers) => {
				setPendingOrgs(data)
				if(headers){
					setPendingHeadings(headers)
				}
			},
		})

		return parser
	}

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

	const headingsMap = [
		{
			name: 'title',
			label: 'Title',
			forms: ['title', 'org', 'organization', 'name', 'org name', 'organization name'],
			type: String,
		},
		{
			name: 'ask',
			label: 'Ask',
			forms: ['ask', 'amount', 'request'],
			type: (val: string|number) => typeof val === 'string' ? parseFloat(val.replace(/[^0-9.]/g, '')) : val,
		},
		{
			name: 'description',
			label: 'Description',
			forms: ['description', 'desc', 'about', 'details', 'info', 'project overview'],
			type: String,
		},
	]

	return (
		<Dropzone onDrop={ handleFileInputChange } />
	)


	// TODO: Set loading=true when button clicked, false when csv is loaded
	// return (
	// 	<>
	// 		{ pendingOrgs.length > 0 && pendingHeadings.length > 0 && (
	// 			<ImportMapping
	// 				headings={ pendingHeadings }
	// 				values={ pendingOrgs }
	// 				mapping={ headingsMap }
	// 				onImport={ handleImportData }
	// 			/>
	// 		) }

	// 		<Button
	// 			style={ { float: 'right' } }
	// 			onClick={ () => fileInputRef.current.click() }
	// 			disabled={ loading }
	// 		>
	// 			Import List as .csv
	// 		</Button>
	// 		<FileInput
	// 			inputRef={ fileInputRef }
	// 			name='orgs_import_file'
	// 			accept='.csv'
	// 			style={ { display: 'none' } }
	// 			onChange={ handleFileInputChange }
	// 		/>
	// 	</>
	// )
}

export default OrgsImport
