import { Field, FieldLabel } from "@measured/puck"

import { DropzoneInput } from "@/components/Inputs"
import { IMAGE_MIME_TYPE } from "@/lib"

function imageField(): Field<string>
function imageField(params: Partial<Field<string>>): Field<string>
function imageField({ label = "Image" }: Partial<Field<string>> = {}): Field<string> {
	return {
		type: "custom",
		label: label,
		render: ({ field, name, onChange, value }) => {
			const handleUploadComplete = (signedIds: string[]) => {
				if(signedIds.length > 0) {
					const signedId = signedIds[0]
					const imageUrl = `/rails/active_storage/blobs/redirect/${signedId}/image`
					onChange(imageUrl)
				}
			}

			return (
				<FieldLabel label={ label }>
					<DropzoneInput
						name={ name }
						accept={ IMAGE_MIME_TYPE }
						uploadMode="immediate"
						onUploadComplete={ handleUploadComplete }
					/>
					{ value && (
						<div style={ { marginTop: "1rem" } }>
							<img
								src={ value }
								alt="Uploaded image"
								style={ { maxWidth: "100%", height: "auto" } }
							/>
						</div>
					) }
				</FieldLabel>
			)
		},
	}
}

export default imageField
