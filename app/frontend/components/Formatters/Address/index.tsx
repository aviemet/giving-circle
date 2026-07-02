import addressFormatter from "@fragaria/address-formatter"
import { useMemo } from "react"

import { Box } from "@/components"

interface AddressFormatterProps {
	address: Schema.Address
}

export const AddressFormatter = ({ address }: AddressFormatterProps) => {
	const formatAddressLines = useMemo(() => {
		const addressData = {
			road: address.address_2
				? `${address.address}\n${address.address_2}`
				: address.address,
			city: address.city,
			state: address.region,
			postcode: address.postal,
			countryCode: address.country,
			name: address.category?.name ?? (typeof address.name === "string" ? address.name : undefined),
		}

		const formattedLines = addressFormatter.format(addressData, {
			output: "array",
			appendCountry: true,
		})
		return formattedLines.filter(Boolean)
	}, [address])

	return (
		<address>
			{ formatAddressLines.map((line, index) => (
				<Box key={ index }>
					{ line }
				</Box>
			)) }
		</address>
	)
}
