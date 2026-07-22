import { Field } from "@puckeditor/core"

import { Button } from "@/components"
import { DropzoneInput } from "@/components/Inputs"
import { activeStorageBlobRedirectUrl, IMAGE_MIME_TYPE } from "@/lib"
import { i18n } from "@/lib/i18n"

import { type BackgroundImageValue } from "./backgroundImage"
import * as classes from "../puckFieldStyles.css"

const t = i18n.t.bind(i18n)

function backgroundImageUrlField(): Field<string> {
	return {
		type: "custom",
		label: "",
		render: ({ name, onChange, value }) => {
			const url = value ?? ""

			const handleUploadComplete = (signedIds: string[]) => {
				if(signedIds.length === 0) return

				onChange(activeStorageBlobRedirectUrl(signedIds[0]))
			}

			return (
				<div className={ classes.puckFieldStack }>
					{ url.length === 0 && (
						<DropzoneInput
							name={ `${name}.upload` }
							accept={ IMAGE_MIME_TYPE }
							uploadMode="immediate"
							onUploadComplete={ handleUploadComplete }
						/>
					) }

					{ url.length > 0 && (
						<>
							<div
								className={ classes.puckFieldImagePreview }
								style={ { backgroundImage: `url("${url}")` } }
							/>

							<Button
								size="compact-xs"
								variant="light"
								color="red"
								onClick={ () => onChange("") }
							>
								{ t("slides.editor.fields.background_image.remove_image") }
							</Button>
						</>
					) }
				</div>
			)
		},
	}
}

function backgroundImageField(): Field<BackgroundImageValue>
function backgroundImageField(params: Partial<Field<BackgroundImageValue>>): Field<BackgroundImageValue>
function backgroundImageField({
	label = t("slides.editor.fields.background_image.label"),
}: Partial<Field<BackgroundImageValue>> = {}): Field<BackgroundImageValue> {
	return {
		type: "object",
		label,
		objectFields: {
			url: backgroundImageUrlField(),
			size: {
				type: "select",
				label: t("slides.editor.fields.background_image.size"),
				options: [
					{ label: t("slides.editor.fields.background_image.size_cover"), value: "cover" },
					{ label: t("slides.editor.fields.background_image.size_contain"), value: "contain" },
					{ label: t("slides.editor.fields.background_image.size_auto"), value: "auto" },
					{ label: t("slides.editor.fields.background_image.size_custom"), value: "custom" },
				],
			},
			customSize: {
				type: "text",
				label: t("slides.editor.fields.background_image.custom_size"),
			},
			offsetX: {
				type: "text",
				label: t("slides.editor.fields.background_image.offset_x"),
			},
			offsetY: {
				type: "text",
				label: t("slides.editor.fields.background_image.offset_y"),
			},
			repeat: {
				type: "select",
				label: t("slides.editor.fields.background_image.repeat"),
				options: [
					{ label: t("slides.editor.fields.background_image.repeat_no"), value: "no-repeat" },
					{ label: t("slides.editor.fields.background_image.repeat"), value: "repeat" },
					{ label: t("slides.editor.fields.background_image.repeat_x"), value: "repeat-x" },
					{ label: t("slides.editor.fields.background_image.repeat_y"), value: "repeat-y" },
				],
			},
			attachment: {
				type: "select",
				label: t("slides.editor.fields.background_image.attachment"),
				options: [
					{ label: t("slides.editor.fields.background_image.attachment_scroll"), value: "scroll" },
					{ label: t("slides.editor.fields.background_image.attachment_fixed"), value: "fixed" },
				],
			},
		},
	}
}

export { backgroundImageField }
