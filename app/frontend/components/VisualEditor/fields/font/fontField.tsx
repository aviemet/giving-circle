import { Field } from "@puckeditor/core"

import { i18n } from "@/lib/i18n"

import { FontFamilyControls } from "./FontFamilyControls"
import { defaultFontValue, type FontValue } from "./fontValue"
import { PuckFieldLabel } from "../shared/PuckFieldLabel"

const t = i18n.t.bind(i18n)

function fontField(): Field<FontValue>
function fontField(params: Partial<Field<FontValue>> & { allowInherit?: boolean }): Field<FontValue>
function fontField({
	label = t("slides.editor.fields.font.label"),
	allowInherit = true,
}: Partial<Field<FontValue>> & { allowInherit?: boolean } = {}): Field<FontValue> {
	return {
		type: "custom",
		label,
		render: ({ name, value, onChange }) => (
			<PuckFieldLabel label={ label ?? t("slides.editor.fields.font.label") }>
				<FontFamilyControls
					name={ name }
					value={ value ?? defaultFontValue() }
					onChange={ onChange }
					allowInherit={ allowInherit }
				/>
			</PuckFieldLabel>
		),
	}
}

export { fontField }
export {
	defaultFontValue,
	componentFontFamilyCss,
	fontFamilyCss,
	GENERIC_FONT_FAMILIES,
	hasCustomFont,
	hasFontFamily,
	isGenericFontFamily,
	type FontValue,
	type GenericFontFamily,
} from "./fontValue"
