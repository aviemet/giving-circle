import { Field } from "@measured/puck"

import { Button } from "@/components"
import { DropzoneInput, Select, TextInput } from "@/components/Inputs"
import { activeStorageBlobRedirectUrl, IMAGE_MIME_TYPE } from "@/lib"

import {
	type BackgroundImageValue,
	isBackgroundImageAttachment,
	isBackgroundImageRepeat,
	isBackgroundImageSize,
	normalizeBackgroundImageValue,
} from "./backgroundImage"
import { PuckFieldLabel } from "./PuckFieldLabel"

function backgroundImageField(): Field<BackgroundImageValue>
function backgroundImageField(params: Partial<Field<BackgroundImageValue>>): Field<BackgroundImageValue>
function backgroundImageField({ label = "Background Image" }: Partial<Field<BackgroundImageValue>> = {}): Field<BackgroundImageValue> {
	return {
		type: "custom",
		label,
		render: ({ name, onChange, value }) => {
			const backgroundImage = normalizeBackgroundImageValue(value)

			const updateBackgroundImage = (patch: Partial<BackgroundImageValue>) => {
				onChange({
					...backgroundImage,
					...patch,
				})
			}

			const handleUploadComplete = (signedIds: string[]) => {
				if(signedIds.length === 0) return

				updateBackgroundImage({
					url: activeStorageBlobRedirectUrl(signedIds[0]),
				})
			}

			return (
				<PuckFieldLabel label={ label }>
					<div
						style={ {
							display: "flex",
							flexDirection: "column",
							rowGap: "0.75rem",
						} }
					>
						{ backgroundImage.url.length === 0 && (
							<DropzoneInput
								name={ `${name}.upload` }
								accept={ IMAGE_MIME_TYPE }
								uploadMode="immediate"
								onUploadComplete={ handleUploadComplete }
							/>
						) }

						{ backgroundImage.url.length > 0 && (
							<>
								<div
									style={ {
										width: "100%",
										height: "120px",
										borderRadius: "4px",
										overflow: "hidden",
										backgroundColor: "var(--puck-color-grey-10)",
										backgroundImage: `url("${backgroundImage.url}")`,
										backgroundSize: "cover",
										backgroundPosition: "center",
									} }
								/>

								<Button
									size="compact-xs"
									variant="light"
									color="red"
									onClick={ () => updateBackgroundImage({ url: "" }) }
								>
									Remove image
								</Button>
							</>
						) }

						<Select
							wrapper={ false }
							label="Size"
							name={ `${name}.size` }
							value={ backgroundImage.size }
							options={ [
								{ label: "Cover", value: "cover" },
								{ label: "Contain", value: "contain" },
								{ label: "Auto", value: "auto" },
								{ label: "Custom", value: "custom" },
							] }
							onChange={ (nextValue) => {
								if(!nextValue || !isBackgroundImageSize(nextValue)) return

								updateBackgroundImage({ size: nextValue })
							} }
						/>

						{ backgroundImage.size === "custom" && (
							<TextInput
								wrapper={ false }
								label="Custom size"
								name={ `${name}.customSize` }
								value={ backgroundImage.customSize }
								placeholder="100% 100%"
								onChange={ (event) => updateBackgroundImage({ customSize: event.currentTarget.value }) }
							/>
						) }

						<TextInput
							wrapper={ false }
							label="Offset X"
							name={ `${name}.offsetX` }
							value={ backgroundImage.offsetX }
							placeholder="center"
							onChange={ (event) => updateBackgroundImage({ offsetX: event.currentTarget.value }) }
						/>

						<TextInput
							wrapper={ false }
							label="Offset Y"
							name={ `${name}.offsetY` }
							value={ backgroundImage.offsetY }
							placeholder="center"
							onChange={ (event) => updateBackgroundImage({ offsetY: event.currentTarget.value }) }
						/>

						<Select
							wrapper={ false }
							label="Repeat"
							name={ `${name}.repeat` }
							value={ backgroundImage.repeat }
							options={ [
								{ label: "No repeat", value: "no-repeat" },
								{ label: "Repeat", value: "repeat" },
								{ label: "Repeat X", value: "repeat-x" },
								{ label: "Repeat Y", value: "repeat-y" },
							] }
							onChange={ (nextValue) => {
								if(!nextValue || !isBackgroundImageRepeat(nextValue)) return

								updateBackgroundImage({ repeat: nextValue })
							} }
						/>

						<Select
							wrapper={ false }
							label="Attachment"
							name={ `${name}.attachment` }
							value={ backgroundImage.attachment }
							options={ [
								{ label: "Scroll", value: "scroll" },
								{ label: "Fixed", value: "fixed" },
							] }
							onChange={ (nextValue) => {
								if(!nextValue || !isBackgroundImageAttachment(nextValue)) return

								updateBackgroundImage({ attachment: nextValue })
							} }
						/>
					</div>
				</PuckFieldLabel>
			)
		},
	}
}

export { backgroundImageField }
