import cx from "clsx"
import React from "react"
import { NestedObject, useInertiaInput } from "use-inertia-form"

import ConditionalWrapper from "@/components/ConditionalWrapper"
import RichTextInput, { type RichTextInputProps } from "@/components/Inputs/RichText"

import Field from "../components/Field"

import { type InputConflicts, type BaseFormInputProps } from "."

interface FormRichTextInputProps<TForm extends NestedObject = NestedObject>
	extends
	Omit<RichTextInputProps, InputConflicts>,
	BaseFormInputProps<string, TForm> {}

const RichText = <TForm extends NestedObject = NestedObject>({
	label,
	name,
	required = false,
	id,
	onChange,
	onBlur,
	onFocus,
	model,
	field = true,
	wrapperProps,
	errorKey,
	defaultValue,
	clearErrorsOnChange,
	...props
}: FormRichTextInputProps<TForm>) => {
	const { form, inputName, inputId, value, setValue, error } = useInertiaInput<string, TForm>({
		name,
		model,
		errorKey,
		defaultValue,
		clearErrorsOnChange,
	})

	const handleChange = (v: string) => {
		setValue(v)
		onChange?.(v, form)
	}

	const handleBlur = () => {
		onBlur?.(value, form )
	}

	return (
		<ConditionalWrapper
			condition={ field }
			wrapper={ children => (
				<Field
					type="textarea"
					required={ required }
					errors={ !!error }
					{ ...wrapperProps }
				>
					{ children }
				</Field>
			) }
		>
			<>
				{ label && <label className={ cx({ required }) } htmlFor={ id || inputId }>
					{ label }
				</label> }
				<RichTextInput
					id={ id }
					name={ inputName }
					onChange={ handleChange }
					onBlur={ handleBlur }
					onFocus={ () => onFocus?.(value, form ) }
					value={ value }
					wrapper={ false }
					{ ...props }
				/>
			</>
		</ConditionalWrapper>
	)
}

export default RichText
