import {
	puckFieldControl,
	puckFields,
	puckMentionChip,
	puckTagsInput,
} from "./puckFieldStyles.css"

export const puckFieldClassNames = {
	fields: puckFields,
	control: puckFieldControl,
	tagsInput: puckTagsInput,
	mentionChip: puckMentionChip,
} as const
