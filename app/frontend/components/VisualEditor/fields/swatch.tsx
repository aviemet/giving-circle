import SwatchPicker from "@/components/SwatchPicker"

export const SwatchField = ({ name, onChange, value }: { name: string, onChange: (value: string) => void, value: string }) => {
	return (
		<SwatchPicker
			value={ value }
			onChange={ onChange }
		/>
	)
}
