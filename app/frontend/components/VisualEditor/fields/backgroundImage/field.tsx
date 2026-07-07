import { Field } from "@measured/puck"

import { Button } from "@/components"
import { DropzoneInput } from "@/components/Inputs"
import { activeStorageBlobRedirectUrl, IMAGE_MIME_TYPE } from "@/lib"

import { type BackgroundImageValue } from "./backgroundImage"
import * as classes from "../puckFieldStyles.css"

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
								Remove image
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
function backgroundImageField({ label = "Background Image" }: Partial<Field<BackgroundImageValue>> = {}): Field<BackgroundImageValue> {
	return {
		type: "object",
		label,
		objectFields: {
			url: backgroundImageUrlField(),
			size: {
				type: "select",
				label: "Size",
				options: [
					{ label: "Cover", value: "cover" },
					{ label: "Contain", value: "contain" },
					{ label: "Auto", value: "auto" },
					{ label: "Custom", value: "custom" },
				],
			},
			customSize: {
				type: "text",
				label: "Custom size",
			},
			offsetX: {
				type: "text",
				label: "Offset X",
			},
			offsetY: {
				type: "text",
				label: "Offset Y",
			},
			repeat: {
				type: "select",
				label: "Repeat",
				options: [
					{ label: "No repeat", value: "no-repeat" },
					{ label: "Repeat", value: "repeat" },
					{ label: "Repeat X", value: "repeat-x" },
					{ label: "Repeat Y", value: "repeat-y" },
				],
			},
			attachment: {
				type: "select",
				label: "Attachment",
				options: [
					{ label: "Scroll", value: "scroll" },
					{ label: "Fixed", value: "fixed" },
				],
			},
		},
	}
}

export { backgroundImageField }
