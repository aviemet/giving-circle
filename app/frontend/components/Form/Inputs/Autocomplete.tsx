import cx from "clsx"
import React from "react"
import { NestedObject, useInertiaInput } from "use-inertia-form"

import ConditionalWrapper from "@/components/ConditionalWrapper"
import AutocompleteInput, { type AutocompleteProps } from "@/components/Inputs/AutocompleteInput"

import Field from "../components/Field"

import { InputConflicts, type BaseFormInputProps } from "."


interface FormAutocompleteProps<TForm extends NestedObject = NestedObject>
	extends
	Omit<AutocompleteProps, InputConflicts>,
	BaseFormInputProps<string, TForm> {

	endpoint?: string
}

const FormAutocompleteComponent = <TForm extends NestedObject = NestedObject>(
	{
		name,
		model,
		onChange,
		onBlur,
		onFocus,
		id,
		required,
		field = true,
		endpoint,
		wrapperProps,
		errorKey,
		defaultValue,
		clearErrorsOnChange,
		...props
	} : FormAutocompleteProps<TForm>,
) => {
	const { form, inputName, inputId, value, setValue, error } = useInertiaInput<string, TForm>({
		name,
		model,
		errorKey,
		defaultValue,
		clearErrorsOnChange,
	})

	const handleChange = (parameter: string) => {
		setValue(parameter)
		onChange?.(parameter, form)
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
		if(onBlur) onBlur(value, form)
	}

	return (
		<ConditionalWrapper
			condition={ props.hidden !== true && field }
			wrapper={ children => (
				<Field
					type="text"
					required={ required }
					errors={ !!error }
					{ ...wrapperProps }
				>
					{ children }
				</Field>
			) }
		>
			<AutocompleteInput
				id={ id || inputId }
				name={ inputName }
				value={ value }
				onChange={ handleChange }
				onBlur={ handleBlur }
				error={ errorKey ? form.getError(errorKey) : error }
				wrapperProps={ {
					component: Field,
					className: cx({ required }),
					errors: Boolean(error),
					style: { padding: 0 },
				} }
				wrapper={ false }
				{ ...props }
			/>
		</ConditionalWrapper>
	)
}

export default FormAutocompleteComponent
