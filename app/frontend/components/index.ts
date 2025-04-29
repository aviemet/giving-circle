export { default as Breadcrumbs } from "./Breadcrumbs"
export { default as Button, type ButtonProps } from "./Button"
export { default as ConditionalWrapper } from "./ConditionalWrapper"
export { default as DangerousHtml } from "./DangerousHtml"
export { default as Date } from "./Date"
export { default as Dropzone } from "./Dropzone"
export { default as Flash } from "./Flash"
export { default as Link, NavLink } from "./Link"
export { default as Menu } from "./Menu"
export { default as Money } from "./Money"
export { default as Page, type PageProps } from "./Page"
export { default as RichTextEditor } from "./RichTextEditor"
export { default as Section } from "./Section"
export { default as Table } from "./Table"
export { default as Label } from "./Label"
export { default as Tabs } from "./Tabs"

// Export UI library components as a proxy to allow easy refactoring
export {
	Accordion, type AccordionProps,
	ActionIcon, type ActionIconProps,
	AppShell, type AppShellProps,
	Avatar, type AvatarProps,
	Badge, type BadgeProps,
	Box, type BoxProps,
	Burger, type BurgerProps,
	Card, type CardProps,
	Center, type CenterProps,
	Chip, type ChipProps,
	Code, type CodeProps,
	Container, type ContainerProps,
	Divider, type DividerProps,
	Flex, type FlexProps,
	Grid, type GridProps,
	Group, type GroupProps,
	Image, type ImageProps,
	List, type ListProps,
	Modal, type ModalProps,
	Paper, type PaperProps,
	Portal, type PortalProps,
	ScrollArea, type ScrollAreaProps,
	SimpleGrid, type SimpleGridProps,
	Skeleton, type SkeletonProps,
	Stack, type StackProps,
	Text, type TextProps,
	Title, type TitleProps,
	Tooltip, type TooltipProps,
	ThemeIcon as Icon, type ThemeIconProps as IconProps,
	UnstyledButton, type UnstyledButtonProps,
} from "@mantine/core"

export {
	type FileWithPath,
} from "@mantine/dropzone"
