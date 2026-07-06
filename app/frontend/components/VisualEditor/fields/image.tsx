import { Field } from "@measured/puck"

import { DropzoneInput } from "@/components/Inputs"
import { activeStorageBlobRedirectUrl, IMAGE_MIME_TYPE } from "@/lib"

import * as classes from "../puckFieldStyles.css"
import { PuckFieldLabel } from "./PuckFieldLabel"

function imageField(): Field<string>
function imageField(params: Partial<Field<string>>): Field<string>
function imageField({ label = "Image" }: Partial<Field<string>> = {}): Field<string> {
	return {
		type: "custom",
		label: label,
		render: ({ field, name, onChange, value }) => {
			const handleUploadComplete = (signedIds: string[]) => {
				if(signedIds.length > 0) {
					onChange(activeStorageBlobRedirectUrl(signedIds[0]))
				}
			}

			return (
				<PuckFieldLabel label={ label }>
					<DropzoneInput
						name={ name }
						accept={ IMAGE_MIME_TYPE }
						uploadMode="immediate"
						onUploadComplete={ handleUploadComplete }
					/>
					{ value && (
						<div className={ classes.puckFieldUploadedImageHost }>
							<img
								src={ value }
								alt="Uploaded image"
								className={ classes.puckFieldUploadedImage }
							/>
						</div>
					) }
				</PuckFieldLabel>
			)
		},
	}
}

export { imageField }
