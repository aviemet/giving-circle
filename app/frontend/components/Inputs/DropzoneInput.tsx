import { Dropzone, type DropzoneProps as MantineDropzoneProps, FileWithPath } from "@mantine/dropzone"
import { forwardRef, useState, useImperativeHandle } from "react"

import { Group, Text } from "@/components"
import { theme } from "@/lib"
import { uploadFile } from "@/lib/files"

import { CancelIcon, PhotoIcon, UploadIcon } from "../Icons"

interface DropzoneInputProps extends Omit<MantineDropzoneProps, "onDrop" | "multiple"> {
	uploadMode?: "immediate" | "onSubmit"
	multiple?: boolean
	onUploadComplete?: (signedIds: string[]) => void
	onDrop?: (files: FileWithPath[]) => void
}

export type DropzoneInputHandle = {
	upload: () => Promise<string[]>
}

const DropzoneInput = forwardRef<DropzoneInputHandle, DropzoneInputProps>(
	(
		{
			id,
			name,
			uploadMode = "onSubmit",
			multiple = false,
			onUploadComplete,
			onDrop,
			...props
		},
		ref
	) => {
		const inputId = id || name
		const [files, setFiles] = useState<FileWithPath[]>([])

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
						<PhotoIcon size={ 52 } color="var(--mantine-color-dimmed)" />
					</Dropzone.Idle>

					<div>
						<Text size="xl" inline>
							Drag image here or click to select files
						</Text>
					</div>
				</Group>
			</Dropzone>
		)
	}
)

export default DropzoneInput
