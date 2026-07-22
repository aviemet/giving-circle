import { Dropzone, type DropzoneProps as MantineDropzoneProps, FileWithPath } from "@mantine/dropzone"
import { useState, useImperativeHandle, type Ref } from "react"

import { Group, Text } from "@/components"
import { theme } from "@/lib"
import { uploadFile } from "@/lib/files"

import { CancelIcon, PhotoIcon, UploadIcon } from "../Icons"

interface DropzoneInputProps extends Omit<MantineDropzoneProps, "onDrop" | "multiple" | "ref"> {
	uploadMode?: "immediate" | "onSubmit"
	multiple?: boolean
	onUploadComplete?: (signedIds: string[]) => void
	onDrop?: (files: FileWithPath[]) => void
	prompt?: string
}

export type DropzoneInputHandle = {
	upload: () => Promise<string[]>
}

type DropzoneInputPropsWithRef = DropzoneInputProps & {
	ref?: Ref<DropzoneInputHandle>
}

const DEFAULT_IMAGE_PROMPT = "Drag image here or click to select files"

export function DropzoneInput({
	id,
	name,
	ref,
	uploadMode = "onSubmit",
	multiple = false,
	onUploadComplete,
	onDrop,
	prompt = DEFAULT_IMAGE_PROMPT,
	...props
}: DropzoneInputPropsWithRef) {
	const inputId = id || name
	const [files, setFiles] = useState<FileWithPath[]>([])
	const IdleIcon = prompt === DEFAULT_IMAGE_PROMPT ? PhotoIcon : UploadIcon

	const handleDrop = (acceptedFiles: FileWithPath[]) => {
		onDrop?.(acceptedFiles)

		if(uploadMode === "immediate") {
			Promise.all(
				acceptedFiles.map(
					file =>
						new Promise<string>((resolve, reject) => {
							uploadFile(
								file,
								signedId => resolve(signedId),
								error => reject(error)
							)
						})
				)
			).then(signedIds => {
				onUploadComplete?.(signedIds)
			})
		} else {
			setFiles(acceptedFiles)
		}
	}

	useImperativeHandle(ref, () => ({
		upload: () => {
			return Promise.all(
				files.map(
					file =>
						new Promise<string>((resolve, reject) => {
							uploadFile(
								file,
								signedId => resolve(signedId),
								error => reject(error)
							)
						})
				)
			).then(signedIds => {
				onUploadComplete?.(signedIds)
				return signedIds
			})
		},
	}), [files, onUploadComplete])

	return (
		<Dropzone
			name={ name }
			id={ inputId }
			onDrop={ handleDrop }
			multiple={ multiple }
			{ ...props }
		>
			<Group justify="center" gap="xl" mih={ 220 } style={ { pointerEvents: "none" } }>
				<Dropzone.Accept>
					<UploadIcon size={ 52 } color={ theme.colors.blue[6] } />
				</Dropzone.Accept>
				<Dropzone.Reject>
					<CancelIcon size={ 52 } color="var(--mantine-color-red-6)" />
				</Dropzone.Reject>
				<Dropzone.Idle>
					<IdleIcon size={ 52 } color="var(--mantine-color-dimmed)" />
				</Dropzone.Idle>

				<div>
					<Text size="xl" inline>
						{ prompt }
					</Text>
				</div>
			</Group>
		</Dropzone>
	)
}

