import { FileWithPath } from "@mantine/dropzone"
import { Field, FieldLabel } from "@measured/puck"

import { DropzoneInput } from "@/components/Inputs"
import { IMAGE_MIME_TYPE } from "@/lib"

function imageField(): Field<string>
function imageField(params: Partial<Field<string>>): Field<string>
function imageField({ label = "image source" }: Partial<Field<string>> = {}): Field<string> {
	return {
		type: "custom",
		label: label,
		render: ({ field, name, onChange, value }) => {
			const handleDrop = (files: FileWithPath[]) => {
				if(files.length > 0) {
					const file = files[0]
					const previewUrl = URL.createObjectURL(file)
					onChange(previewUrl)
				}
			}

			return (
				<FieldLabel label={ label }>
					<DropzoneInput
						name={ name }
						accept={ IMAGE_MIME_TYPE }
						onDrop={ handleDrop }
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
