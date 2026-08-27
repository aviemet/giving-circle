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
	fontSelectOptions,
	fontSelectValue,
	fontValueFromSelect,
} from "./fontSelect"
import {
	defaultFontValue,
	type GenericFontFamily,
	type FontValue,
} from "./fontValue"
import { IconControlTooltip } from "../shared/IconControlTooltip"

const t = i18n.t.bind(i18n)

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
	const { active_circle, params } = usePageProps<"editThemePresentationSlide" | "settingsTemplatesEditSlide">()
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

	const circleFonts = fontsQuery.data ?? []
	const genericLabels = {
		serif: t(GENERIC_FONT_LABEL_KEYS.serif),
		"sans-serif": t(GENERIC_FONT_LABEL_KEYS["sans-serif"]),
		monospace: t(GENERIC_FONT_LABEL_KEYS.monospace),
		cursive: t(GENERIC_FONT_LABEL_KEYS.cursive),
		fantasy: t(GENERIC_FONT_LABEL_KEYS.fantasy),
	}
	const emptyOptionLabel = allowInherit
		? t("slides.editor.fields.font.inherit")
		: t("slides.editor.fields.font.system_default")
	const selectOptions = fontSelectOptions(
		circleFonts,
		fontValue,
		genericLabels,
		emptyOptionLabel,
	)
	const selectedValue = fontSelectValue(fontValue, circleFonts)

	const handleSelectChange = (nextValue: string | null) => {
		const nextFont = fontValueFromSelect(nextValue, circleFonts, fontValue)
		if(nextFont === undefined) {
			return
		}

		onChange(nextFont)
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
