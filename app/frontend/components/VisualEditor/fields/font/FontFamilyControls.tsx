import clsx from "clsx"
import { useRef, useState, type ChangeEvent } from "react"

import { UploadIcon } from "@/components/Icons"
import { Select } from "@/components/Inputs"
import { FONT_MIME_TYPE, uploadFile } from "@/lib/files"
import { usePageProps } from "@/lib/hooks"
import { i18n } from "@/lib/i18n"
import { useAttachCircleFont, useCircleFonts } from "@/queries"

import * as classes from "./fontField.css"
import {
	defaultFontValue,
	GENERIC_FONT_FAMILIES,
	type GenericFontFamily,
	isGenericFontFamily,
	type FontValue,
} from "./fontValue"
import { IconControlTooltip } from "../shared/IconControlTooltip"

const t = i18n.t.bind(i18n)

const INHERIT_VALUE = ""

const GENERIC_FONT_LABEL_KEYS = {
	serif: "slides.editor.fields.font.generics.serif",
	"sans-serif": "slides.editor.fields.font.generics.sans_serif",
	monospace: "slides.editor.fields.font.generics.monospace",
	cursive: "slides.editor.fields.font.generics.cursive",
	fantasy: "slides.editor.fields.font.generics.fantasy",
} as const satisfies Record<GenericFontFamily, string>

interface FontFamilyControlsProps {
	name: string
	value: FontValue | undefined
	onChange: (next: FontValue) => void
	allowInherit: boolean
}

export function FontFamilyControls({
	name,
	value,
	onChange,
	allowInherit,
}: FontFamilyControlsProps) {
	const { active_circle, params } = usePageProps<"editThemePresentationSlide">()
	const circleSlug = active_circle?.slug ?? params.circle_slug ?? ""
	const fontValue = value ?? defaultFontValue()
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

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

	const isBusy = fontsQuery.isLoading || isUploading || attachFont.isPending
	const canUpload = circleSlug.length > 0 && !isBusy

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		event.target.value = ""
		if(!file || circleSlug.length === 0) {
			return
		}

		setIsUploading(true)
		uploadFile(
			file,
			(signedId) => {
				attachFont.mutate(
					{ signedId },
					{
						onError: () => {
							setIsUploading(false)
						},
					},
				)
			},
			() => {
				setIsUploading(false)
			},
		)
	}

	return (
		<div className={ clsx(classes.fontFieldRow) }>
			<Select
				wrapper={ false }
				name={ `${name}.selection` }
				value={ selectedValue }
				onChange={ handleSelectChange }
				options={ selectOptions }
				placeholder={ t("slides.editor.fields.font.placeholder") }
				disabled={ isBusy }
			/>
			<IconControlTooltip label={ t("slides.editor.fields.font.upload") }>
				<button
					type="button"
					className={ clsx(classes.fontUploadButton) }
					aria-label={ t("slides.editor.fields.font.upload") }
					disabled={ !canUpload }
					onClick={ () => {
						fileInputRef.current?.click()
					} }
				>
					<UploadIcon />
				</button>
			</IconControlTooltip>
			<input
				ref={ fileInputRef }
				className={ clsx(classes.fontFileInput) }
				type="file"
				name={ `${name}.upload` }
				accept={ FONT_MIME_TYPE.join(",") }
				disabled={ !canUpload }
				onChange={ handleFileChange }
			/>
		</div>
	)
}
