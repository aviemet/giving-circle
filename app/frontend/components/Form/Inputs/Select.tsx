import { type ComboboxData, type ComboboxItem, type ComboboxItemGroup } from "@mantine/core"
import { useInertiaInput, type UseFormProps, NestedObject } from "use-inertia-form"

import { ConditionalWrapper, Group } from "@/components"
import { ModalFormButton } from "@/components/Button"
import SelectInput, { type SelectInputProps } from "@/components/Inputs/Select"
import { exclude } from "@/lib"

import Field from "../components/Field"

import { type BaseFormInputProps } from "."

export type SelectOption = string | ComboboxItem | ComboboxItemGroup<string | ComboboxItem>
export { type ComboboxData, ComboboxItem, ComboboxItemGroup }

type OmittedOverwrittenTypes = "onFocus" | "onBlur" | "onChange" | "onClear" | "onDropdownOpen" | "onDropdownClose" | "onOptionSubmit"
export interface FormSelectProps<TForm extends NestedObject = NestedObject>
	extends
	Omit<SelectInputProps, OmittedOverwrittenTypes | "name" | "defaultValue">,
	Omit<BaseFormInputProps<string, TForm>, OmittedOverwrittenTypes> {

	onChange?: (option: SelectOption | null, options: ComboboxData, form: UseFormProps<TForm>) => void
	onBlur?: (option: SelectOption | null, options: ComboboxData, form: UseFormProps<TForm>) => void
	onFocus?: (option: SelectOption | null, options: ComboboxData, form: UseFormProps<TForm>) => void
	onClear?: (options: ComboboxData, form: UseFormProps<TForm>) => void
	onDropdownOpen?: (options: ComboboxData, form: UseFormProps<TForm>) => void
	onDropdownClose?: (options: ComboboxData, form: UseFormProps<TForm>) => void
	onOptionSubmit?: (option: SelectOption | null, options: ComboboxData, form: UseFormProps<TForm>) => void
	endpoint?: string
	newForm?: React.ReactElement
	field?: boolean
}

const Select = <TForm extends NestedObject = NestedObject>(
	{
		name,
		label,
		model,
		required,
		onChange,
		onBlur,
		onFocus,
		onClear,
		onDropdownOpen,
		onDropdownClose,
		onOptionSubmit,
		fetchOnOpen,
		endpoint,
		newForm,
		field = true,
		id,
		options,
		wrapperProps,
		defaultValue,
		errorKey,
		clearErrorsOnChange,
		...props
	}: FormSelectProps<TForm>,
) => {
	const { form, inputName, inputId, value, setValue, error } = useInertiaInput<string, TForm>({
		name,
		model,
		defaultValue,
		errorKey,
		clearErrorsOnChange,
	})

	const handleChange = (option: string | null) => {
		setValue(option ? option : "")

		onChange?.(option, options || [], form)
	}

	const handleBlur = () => {
		onBlur?.(String(value), options || [], form)
	}

	const handleFocus = () => {
		onFocus?.(String(value), options || [], form)
	}

	const handleDropdownOpen = () => {
		onDropdownOpen?.(options || [], form)
	}

	const handleDropdownClose = () => {
		onDropdownClose?.(options || [], form)
	}

	const handleNewFormSuccess = (data: { id: string | number }) => {
		setValue(String(data.id))
	}

	const handleClear = () => {
		onClear?.(options || [], form)
	}

	return (
		<ConditionalWrapper
			condition={ newForm !== undefined }
			wrapper={ children => (
				<Group
					grow
					wrap="nowrap"
					align="baseline"
					justify="space-between"
				>
					{ children }
				</Group>
			) }
		>
			<>
				<ConditionalWrapper
					wrapper={ children => (
						<Field
							type="select"
							required={ required }
							errors={ !!error }
							{ ...wrapperProps }
						>
							{ children }
						</Field>
					) }
					condition={ field }
				>
					<SelectInput
						// Add "search" suffix to prevent password managers trying to autofill dropdowns
						id={ `${id || inputId}-search` }
						autoComplete="off"
						name={ inputName }
						label={ label }
						value={ String(value) }
						onChange={ handleChange }
						onBlur={ handleBlur }
						onFocus={ handleFocus }
						onDropdownClose={ handleDropdownClose }
						onDropdownOpen={ handleDropdownOpen }
						onClear={ handleClear }
						defaultValue={ defaultValue ?? String(value) }
						error={ error }
						options={ options }
						wrapper={ false }
						{ ...exclude(props, "value") }
					/>
				</ConditionalWrapper>
				{ newForm && <ModalFormButton
					title={ `Create New ${label}` }
					form={ newForm }
					onSuccess={ handleNewFormSuccess }
				/> }
			</>
		</ConditionalWrapper>
	)
}

export default Select
