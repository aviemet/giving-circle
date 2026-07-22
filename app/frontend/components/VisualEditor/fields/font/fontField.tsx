import { Field } from "@measured/puck"
import clsx from "clsx"
import { useState } from "react"

import { DropzoneInput, Select } from "@/components/Inputs"
import { FONT_MIME_TYPE } from "@/lib/files"
import { usePageProps } from "@/lib/hooks"
import { i18n } from "@/lib/i18n"
import { useAttachCircleFont, useCircleFonts } from "@/queries"

import {
	defaultFontValue,
	GENERIC_FONT_FAMILIES,
	type GenericFontFamily,
	isGenericFontFamily,
	type FontValue,
} from "./fontValue"
import * as classes from "../puckFieldStyles.css"
import { PuckFieldLabel } from "../shared/PuckFieldLabel"

const t = i18n.t.bind(i18n)

const INHERIT_VALUE = ""

const GENERIC_FONT_LABEL_KEYS = {
	serif: "slides.editor.fields.font.generics.serif",
	"sans-serif": "slides.editor.fields.font.generics.sans_serif",
	monospace: "slides.editor.fields.font.generics.monospace",
	cursive: "slides.editor.fields.font.generics.cursive",
	fantasy: "slides.editor.fields.font.generics.fantasy",
} as const satisfies Record<GenericFontFamily, string>

function FontFieldControl({
	name,
	value,
	onChange,
	label,
	allowInherit,
}: {
	name: string
	value: FontValue | undefined
	onChange: (next: FontValue) => void
	label: string
	allowInherit: boolean
}) {
	const { active_circle, params } = usePageProps<"editThemePresentationSlide">()
	const circleSlug = active_circle?.slug ?? params.circle_slug ?? ""
	const fontValue = value ?? defaultFontValue()
	const [isUploading, setIsUploading] = useState(false)

	const fontsQuery = useCircleFonts({ circleSlug }, { enabled: circleSlug.length > 0 })
	const attachFont = useAttachCircleFont({
		params: { circleSlug },
		onSuccess: (font) => {
			onChange({ family: font.family, url: font.url })
			setIsUploading(false)
		},
	})

	const genericOptions = GENERIC_FONT_FAMILIES.map((family) => ({
		value: family,
		label: t(GENERIC_FONT_LABEL_KEYS[family]),
	}))

	const fontOptions = (fontsQuery.data ?? []).map((font) => ({
		value: font.signed_id,
		label: font.family,
	}))

	const emptyOptionLabel = allowInherit
		? t("slides.editor.fields.font.inherit")
		: t("slides.editor.fields.font.system_default")

	const selectOptions = [
		{ value: INHERIT_VALUE, label: emptyOptionLabel },
		...genericOptions,
		...fontOptions,
	]

	let selectedValue = INHERIT_VALUE
	if(fontValue.family.length > 0) {
		if(fontValue.url.length === 0 && isGenericFontFamily(fontValue.family)) {
			selectedValue = fontValue.family
		} else {
			selectedValue = (fontsQuery.data ?? []).find((font) => {
				return font.url === fontValue.url && font.family === fontValue.family
			})?.signed_id ?? INHERIT_VALUE
		}
	}

	const handleSelectChange = (nextValue: string | null) => {
		if(nextValue === null || nextValue === INHERIT_VALUE) {
			onChange(defaultFontValue())
			return
		}

		if(isGenericFontFamily(nextValue)) {
			onChange({ family: nextValue, url: "" })
			return
		}

		const selected = (fontsQuery.data ?? []).find((font) => font.signed_id === nextValue)
		if(selected === undefined) {
			return
		}

		onChange({ family: selected.family, url: selected.url })
	}

	const handleUploadComplete = (signedIds: string[]) => {
		if(signedIds.length === 0 || circleSlug.length === 0) {
			return
		}

		setIsUploading(true)
		attachFont.mutate(
			{ signedId: signedIds[0] },
			{
				onError: () => {
					setIsUploading(false)
				},
			},
		)
	}

	return (
		<div className={ clsx(classes.puckFieldStack) }>
			<PuckFieldLabel label={ label }>
				<Select
					wrapper={ false }
					name={ `${name}.selection` }
					value={ selectedValue }
					onChange={ handleSelectChange }
					options={ selectOptions }
					placeholder={ t("slides.editor.fields.font.placeholder") }
					disabled={ fontsQuery.isLoading || isUploading || attachFont.isPending }
				/>
			</PuckFieldLabel>

			<DropzoneInput
				name={ `${name}.upload` }
				accept={ [...FONT_MIME_TYPE] }
				uploadMode="immediate"
				multiple={ false }
				prompt={ t("slides.editor.fields.font.dropzone") }
				onUploadComplete={ handleUploadComplete }
				disabled={ circleSlug.length === 0 || isUploading || attachFont.isPending }
			/>
		</div>
	)
}

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
			<FontFieldControl
				name={ name }
				value={ value }
				onChange={ onChange }
				label={ label ?? t("slides.editor.fields.font.label") }
				allowInherit={ allowInherit }
			/>
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
