import { Field } from "@puckeditor/core"
import clsx from "clsx"
import { useRef, useState, type ChangeEvent } from "react"

import { TrashIcon, UploadIcon } from "@/components/Icons"
import { activeStorageBlobRedirectUrl, IMAGE_MIME_TYPE, uploadFile } from "@/lib/files"
import { i18n } from "@/lib/i18n"

import * as classes from "./imageField.css"
import { FieldRow, IconControlTooltip, PuckFieldLabel } from "../shared"

function imageText(key: string) {
	return i18n.t(`slides.editor.fields.image.${key}`)
}

interface ImageFieldControlProps {
	name: string
	value: string | undefined
	onChange: (value: string) => void
}

function ImageFieldControl({ name, value, onChange }: ImageFieldControlProps) {
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const hasImage = typeof value === "string" && value.length > 0

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		event.target.value = ""
		if(!file) {
			return
		}

		setIsUploading(true)
		uploadFile(
			file,
			(signedId) => {
				onChange(activeStorageBlobRedirectUrl(signedId, file.name))
				setIsUploading(false)
			},
			() => {
				setIsUploading(false)
			},
		)
	}

	const openFilePicker = () => {
		fileInputRef.current?.click()
	}

	return (
		<div className={ clsx(classes.imageFieldRoot) }>
			<FieldRow label={ imageText("source") }>
				{ hasImage
					? (
						<div className={ clsx(classes.imageRow) }>
							<div
								className={ clsx(classes.thumb) }
								style={ { backgroundImage: `url("${value}")` } }
							/>
							<button
								type="button"
								className={ clsx(classes.uploadButton) }
								aria-label={ imageText("replace") }
								disabled={ isUploading }
								onClick={ openFilePicker }
							>
								<UploadIcon />
								{ imageText("replace") }
							</button>
							<IconControlTooltip label={ imageText("remove") }>
								<button
									type="button"
									className={ clsx(classes.iconButton) }
									aria-label={ imageText("remove") }
									disabled={ isUploading }
									onClick={ () => onChange("") }
								>
									<TrashIcon />
								</button>
							</IconControlTooltip>
						</div>
					)
					: (
						<div className={ clsx(classes.imageRowEmpty) }>
							<button
								type="button"
								className={ clsx(classes.uploadButton) }
								aria-label={ imageText("upload") }
								disabled={ isUploading }
								onClick={ openFilePicker }
							>
								<UploadIcon />
								{ imageText("upload") }
							</button>
						</div>
					) }
				<input
					ref={ fileInputRef }
					className={ clsx(classes.fileInput) }
					type="file"
					name={ `${name}.upload` }
					accept={ IMAGE_MIME_TYPE.join(",") }
					disabled={ isUploading }
					onChange={ handleFileChange }
				/>
			</FieldRow>
		</div>
	)
}

function imageField(): Field<string>
function imageField(params: Partial<Field<string>>): Field<string>
function imageField({ label }: Partial<Field<string>> = {}): Field<string> {
	const resolvedLabel = label ?? imageText("label")

	return {
		type: "custom",
		label: resolvedLabel,
		render: ({ name, onChange, value }) => {
			return (
				<PuckFieldLabel label={ resolvedLabel }>
					<ImageFieldControl
						name={ name }
						value={ value }
						onChange={ onChange }
					/>
				</PuckFieldLabel>
			)
		},
	}
}

export { imageField }
