import SwatchPicker from "@/components/SwatchPicker"

interface SwatchFieldProps {
	name: string
	onChange: (value: string) => void
	value: string
}

export const SwatchField = ({ name, onChange, value }: SwatchFieldProps) => {
	return (
		<SwatchPicker
			value={ value }
			onChange={ onChange }
		/>
	)
}
