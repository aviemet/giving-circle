import { useForm, useInertiaInput, type NestedObject } from "use-inertia-form"

import ConditionalWrapper from "@/components/ConditionalWrapper"
import { Field } from "@/components/Form"
import RadioInput, { type RadioProps } from "@/components/Inputs/Radio"

import { type BaseFormInputProps } from ".."
import FormRadioGroup from "./Group"

export interface FormRadioProps<TForm extends NestedObject>
	extends
	Omit<RadioProps, "name" | "onChange" | "onBlur" | "onFocus" | "defaultValue">,
	Omit<BaseFormInputProps<string, TForm>, "name"> {}

const FormRadioComponent = <TForm extends NestedObject>(
	{
		value,
		onChange,
		onBlur,
		onFocus,
		id,
		required,
		className,
		model,
		field = true,
		style,
		wrapperProps,
		errorKey,
		defaultValue,
		clearErrorsOnChange,
		...props
	}: FormRadioProps<TForm>,
) => {
	const form = useForm<TForm>()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(value, form)
	}

	const handleBlur = () => {
		onBlur?.(value, form)
	}

	return (
		<RadioInput
			id={ id || value }
			className={ className }
			value={ value }
			onChange={ handleChange }
			onBlur={ handleBlur }
			onFocus={ e => onFocus?.(value, form) }
			style={ [{ padding: "14px 10px" }, style] }
			wrapper={ false }
			{ ...props }
		/>
	)
}

FormRadioComponent.Group = FormRadioGroup

export default FormRadioComponent
