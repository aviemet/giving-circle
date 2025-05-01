import { type RadioGroupProps } from "@mantine/core"
import { useInertiaInput } from "use-inertia-form"

import { Radio } from "@/components/Inputs"

export interface FormRadioGroupProps extends RadioGroupProps {
	name: string
	model?: string
}

const FormRadioGroup = ({
	children,
	name,
	model,
	...props
}: FormRadioGroupProps) => {
	const { value, setValue } = useInertiaInput<string>({ name, model })

	const handleValueChange = (vals: string) => {
		setValue(vals)
	}

	return (
		<Radio.Group
			value={ value }
			onChange={ handleValueChange }
			{ ...props }
		>
			{ children }
		</Radio.Group>
	)
}

export default FormRadioGroup
