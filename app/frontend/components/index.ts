export { Breadcrumbs } from "./Breadcrumbs"
export * from "./Button"
export { ColorPickerComponent as ColorPicker } from "./ColorPicker"
export { ConditionalWrapper } from "./ConditionalWrapper"
export { DangerousHtml } from "./DangerousHtml"
export { DropzoneComponent as Dropzone } from "./Dropzone"
export * from "./ErrorBoundary"
export { Flash } from "./Flash"
export * from "./Formatters"
export { Link, NavLink, ButtonLink } from "./Link"
export { LocaleFlag } from "./LocaleFlag"
export { MenuComponent as Menu } from "./Menu"
export { MoneyComponent as Money } from "./Money"
export { Page, type PageProps } from "./Page"
export { RichTextEditor, type RichTextEditorProps } from "./RichTextEditor"
export { Section } from "./Section"
export { Table, type TableColumn, type TableProps } from "./Table"
export { Label } from "./Label"
export { TabsComponent as Tabs } from "./Tabs"
export * from "./Modal"

// Export UI library components as a proxy to allow easy refactoring
export {
	Accordion, type AccordionProps,
	ActionIcon, type ActionIconProps,
	Anchor, type AnchorProps,
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
