export { default as Button } from './Button'
export { default as ConditionalWrapper } from './ConditionalWrapper'
export { default as DangerousHtml } from './DangerousHtml'
export { default as Heading } from './Heading'
export { default as Link } from './Link'
export { default as RichTextEditor } from './RichTextEditor'
export { default as Section } from './Section'
export { default as Table } from './Table'
export { default as Label } from './Inputs/Label'

// Export UI library components as a proxy to allow easy refactoring
export {
	Box,
	Badge,
	Container,
	Flex,
	Group,
	List,
	Modal,
	Paper,
	SimpleGrid,
	Stack,
	Tooltip,
	ThemeIcon as Icon,
} from '@mantine/core'
