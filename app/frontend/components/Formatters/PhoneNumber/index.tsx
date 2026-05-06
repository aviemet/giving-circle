import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber"

import { Anchor } from "@/components"

const phoneUtil = PhoneNumberUtil.getInstance()

interface PhoneFormatterProps {
	children: string
	format?: keyof typeof PhoneNumberFormat
}

export const PhoneFormatter = ({
	children,
	format = "NATIONAL",
}: PhoneFormatterProps) => {

	const parsedNumber = phoneUtil.parseAndKeepRawInput(children, "US")

	return (
		<Anchor href={ `tel:${phoneUtil.format(parsedNumber, PhoneNumberFormat.E164)}` }>{ phoneUtil.format(parsedNumber, PhoneNumberFormat[format]) }</Anchor>
	)
}
