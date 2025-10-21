import { Combobox, Text, useCombobox } from "@mantine/core"
import { useState } from "react"

interface TagOption {
	label: string
	value: string
}

interface MentionComboboxProps {
	items: TagOption[]
	selectedIndex: number
	selectItem: (index: number) => void
	clientRect: () => DOMRect | null
}

const MentionCombobox = ({ items, selectedIndex, selectItem, clientRect }: MentionComboboxProps) => {
	const [opened, setOpened] = useState<boolean>(true)
	const combobox = useCombobox({
		opened,
		onDropdownClose: () => combobox.resetSelectedOption(),
	})

	return (
		<Combobox store={ combobox }
			onClose={ () => setOpened(false) }
			withinPortal={ false }
			position="bottom-start"
			offset={ 0 }
		>
			<Combobox.Dropdown>
				<Combobox.Options>
					{ items.map((item, index) => (
						<Combobox.Option
							key={ item.value }
							value={ item.value }
							active={ index === selectedIndex }
							onMouseDown={ (e) => {
								e.preventDefault()
								e.stopPropagation()
								selectItem(index)
							} }
						>
							<Text>{ item.label }</Text>
						</Combobox.Option>
					)) }
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	)
}

export default MentionCombobox
