import { type DateValue, type DatesRangeValue } from "@mantine/dates"

export { AutocompleteInput } from "./AutocompleteInput"
export { Checkbox } from "./Checkbox"
export { ColorPickerInput } from "./ColorPickerInput"
export { ColorPickerInput as ColorInput } from "./ColorInput"
export { CurrencyInput } from "./CurrencyInput"
export { DateInput } from "./DateInput"
export { DateTimeInput } from "./DateTimeInput"
export { DropzoneInput } from "./DropzoneInput"
export { FileInputComponent as FileInput } from "./FileInput"
export { HiddenInput } from "./HiddenInput"
export { MultiSelect } from "./MultiSelect"
export { NumberInput } from "./NumberInput"
export { PasswordInput } from "./PasswordInput"
export { SegmentedControl } from "./SegmentedControl"
export { RadioComponent as Radio } from "./Radio"
export { RichText } from "./RichText"
export { Select } from "./Select"
export { SwatchInput } from "./SwatchInput"
export { TagsInput } from "./TagsInput"
export { Textarea } from "./Textarea"
export { TextInput } from "./TextInput"
export { TimeInput } from "./TimeInput"
export { Field, type FieldProps } from "./Field"

export interface BaseInputProps {
	wrapper?: boolean
	disableAutofill?: boolean
	name?: string
	required?: boolean
}

export type DateInputValue = DateValue | DatesRangeValue<DateValue> | DateValue[] | undefined

const disableAutofillProps = {
	autoComplete: "off",
	"data-1p-ignore": true,
	"data-bwignore": true,
	"data-lpignore": true,
	"data-form-type": "other",
}

type withInjectedPropsFunc = (
	props: Record<string, unknown>,
	options: {
		disableAutofill?: boolean
	}
) => Record<string, unknown>

export const withInjectedProps: withInjectedPropsFunc = (props, { disableAutofill }) => {
	const usedProps = props ?? {}

	if(disableAutofill) {
		Object.assign(usedProps, disableAutofillProps)
	}

	return usedProps
}
