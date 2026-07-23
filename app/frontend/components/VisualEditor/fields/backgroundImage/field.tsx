import { Field } from "@puckeditor/core"
import { type TFunction } from "i18next"
import { useRef, useState, type ChangeEvent } from "react"

import { TrashIcon, UploadIcon } from "@/components/Icons"
import { ColorInput, TextInput } from "@/components/Inputs"
import { activeStorageBlobRedirectUrl, IMAGE_MIME_TYPE, uploadFile } from "@/lib/files"
import { i18n } from "@/lib/i18n"

import {
	normalizeBackgroundValue,
	type BackgroundValue,
} from "./background"
import * as classes from "./backgroundField.css"
import {
	isBackgroundImageAttachment,
	isBackgroundImageRepeat,
	isBackgroundImageSize,
	type BackgroundImageValue,
} from "./backgroundImage"
import { FieldRow, IconControlTooltip, IconSegmented, PuckFieldLabel } from "../shared"

function backgroundText(t: TFunction, key: string) {
	return t(`slides.editor.fields.background.${key}`)
}

interface BackgroundFieldControlProps {
	name: string
	value: BackgroundValue | undefined
	onChange: (value: BackgroundValue) => void
	t: TFunction
}

function BackgroundFieldControl({
	name,
	value,
	onChange,
	t,
}: BackgroundFieldControlProps) {
	const [localValue, setLocalValue] = useState<BackgroundValue>(() => normalizeBackgroundValue(value))
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const commit = (next: BackgroundValue) => {
		setLocalValue(next)
		onChange(next)
	}

	const updateValue = (patch: Partial<BackgroundValue>) => {
		commit({
			color: "color" in patch ? patch.color : localValue.color,
			image: patch.image === undefined
				? localValue.image
				: {
					...localValue.image,
					...patch.image,
				},
		})
	}

	const updateImage = (patch: Partial<BackgroundImageValue>) => {
		updateValue({
			image: {
				...localValue.image,
				...patch,
			},
		})
	}

	const hasImage = localValue.image.url.length > 0

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
				setLocalValue((previous) => {
					const next: BackgroundValue = {
						...previous,
						image: {
							...previous.image,
							url: activeStorageBlobRedirectUrl(signedId, file.name),
						},
					}
					onChange(next)
					return next
				})
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

	const removeImage = () => {
		updateImage({ url: "" })
	}

	return (
		<div className={ classes.backgroundRoot }>
			<FieldRow label={ backgroundText(t, "color") }>
				<ColorInput
					wrapper={ false }
					name={ `${name}.color` }
					value={ localValue.color ?? "" }
					clearable
					onChange={ (color) => updateValue({ color }) }
					swatches={ [
						"#2e2e2e",
						"#868e96",
						"#fa5252",
						"#e64980",
						"#be4bdb",
						"#7950f2",
						"#4c6ef5",
						"#228be6",
						"#15aabf",
						"#12b886",
						"#40c057",
						"#82c91e",
						"#fab005",
						"#fd7e14",
					] }
				/>
			</FieldRow>

			<FieldRow label={ backgroundText(t, "image") }>
				{ hasImage
					? (
						<div className={ classes.imageRow }>
							<div
								className={ classes.thumb }
								style={ { backgroundImage: `url("${localValue.image.url}")` } }
							/>
							<button
								type="button"
								className={ classes.uploadButton }
								aria-label={ backgroundText(t, "replace") }
								disabled={ isUploading }
								onClick={ openFilePicker }
							>
								<UploadIcon />
								{ backgroundText(t, "replace") }
							</button>
							<IconControlTooltip label={ backgroundText(t, "remove") }>
								<button
									type="button"
									className={ classes.iconButton }
									aria-label={ backgroundText(t, "remove") }
									disabled={ isUploading }
									onClick={ removeImage }
								>
									<TrashIcon />
								</button>
							</IconControlTooltip>
						</div>
					)
					: (
						<div className={ classes.imageRowEmpty }>
							<button
								type="button"
								className={ classes.uploadButton }
								aria-label={ backgroundText(t, "upload") }
								disabled={ isUploading }
								onClick={ openFilePicker }
							>
								<UploadIcon />
								{ backgroundText(t, "upload") }
							</button>
						</div>
					) }
				<input
					ref={ fileInputRef }
					className={ classes.fileInput }
					type="file"
					name={ `${name}.upload` }
					accept={ IMAGE_MIME_TYPE.join(",") }
					disabled={ isUploading }
					onChange={ handleFileChange }
				/>
			</FieldRow>

			{ hasImage && (
				<>
					<FieldRow label={ backgroundText(t, "size") }>
						<IconSegmented
							name={ `${name}.size` }
							value={ localValue.image.size }
							options={ [
								{ value: "cover", label: backgroundText(t, "size_cover") },
								{ value: "contain", label: backgroundText(t, "size_contain") },
								{ value: "auto", label: backgroundText(t, "size_auto") },
								{ value: "custom", label: backgroundText(t, "size_custom") },
							] }
							onChange={ (nextValue) => {
								if(isBackgroundImageSize(nextValue)) {
									updateImage({ size: nextValue })
								}
							} }
						/>
					</FieldRow>

					{ localValue.image.size === "custom" && (
						<FieldRow label={ backgroundText(t, "custom_size") }>
							<TextInput
								wrapper={ false }
								name={ `${name}.customSize` }
								value={ localValue.image.customSize }
								onChange={ (event) => updateImage({ customSize: event.currentTarget.value }) }
							/>
						</FieldRow>
					) }

					<FieldRow label={ backgroundText(t, "position") }>
						<div className={ classes.offsetPair }>
							<TextInput
								wrapper={ false }
								name={ `${name}.offsetX` }
								value={ localValue.image.offsetX }
								placeholder={ backgroundText(t, "offset_x") }
								onChange={ (event) => updateImage({ offsetX: event.currentTarget.value }) }
							/>
							<TextInput
								wrapper={ false }
								name={ `${name}.offsetY` }
								value={ localValue.image.offsetY }
								placeholder={ backgroundText(t, "offset_y") }
								onChange={ (event) => updateImage({ offsetY: event.currentTarget.value }) }
							/>
						</div>
					</FieldRow>

					<FieldRow label={ backgroundText(t, "repeat") }>
						<IconSegmented
							name={ `${name}.repeat` }
							value={ localValue.image.repeat }
							options={ [
								{ value: "no-repeat", label: backgroundText(t, "repeat_no") },
								{ value: "repeat", label: backgroundText(t, "repeat_all") },
								{ value: "repeat-x", label: backgroundText(t, "repeat_x") },
								{ value: "repeat-y", label: backgroundText(t, "repeat_y") },
							] }
							onChange={ (nextValue) => {
								if(isBackgroundImageRepeat(nextValue)) {
									updateImage({ repeat: nextValue })
								}
							} }
						/>
					</FieldRow>

					<FieldRow label={ backgroundText(t, "attachment") }>
						<IconSegmented
							name={ `${name}.attachment` }
							value={ localValue.image.attachment }
							options={ [
								{ value: "scroll", label: backgroundText(t, "attachment_scroll") },
								{ value: "fixed", label: backgroundText(t, "attachment_fixed") },
							] }
							onChange={ (nextValue) => {
								if(isBackgroundImageAttachment(nextValue)) {
									updateImage({ attachment: nextValue })
								}
							} }
						/>
					</FieldRow>
				</>
			) }
		</div>
	)
}

function backgroundField(): Field<BackgroundValue | undefined>
function backgroundField(params: Partial<Field<BackgroundValue | undefined>>): Field<BackgroundValue | undefined>
function backgroundField({
	label = i18n.t("slides.editor.fields.background.label"),
}: Partial<Field<BackgroundValue | undefined>> = {}): Field<BackgroundValue | undefined> {
	const t = i18n.t.bind(i18n)

	return {
		type: "custom",
		label,
		render: ({ name, value, onChange }) => (
			<PuckFieldLabel label={ label ?? backgroundText(t, "label") }>
				<BackgroundFieldControl
					name={ name }
					value={ value }
					onChange={ onChange }
					t={ t }
				/>
			</PuckFieldLabel>
		),
	}
}

export { backgroundField }
