import {
	puckFieldControl,
	puckFieldLabel,
	puckFields,
	puckTagsInput,
} from "./puckFieldStyles.css"

export const puckFieldClassNames = {
	fields: puckFields,
	fieldLabel: puckFieldLabel,
	control: puckFieldControl,
	tagsInput: puckTagsInput,
} as const
