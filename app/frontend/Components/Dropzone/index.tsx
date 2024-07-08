import React from 'react'
import { Group, rem } from '@mantine/core'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { Dropzone, type DropzoneProps as MantineDropzoneProps } from '@mantine/dropzone'

interface DropzoneProps extends MantineDropzoneProps {
	acceptZoneOverride?: React.ReactNode
	rejectZoneOverride?: React.ReactNode
	idleZoneOverride?: React.ReactNode
}

const DropzoneComponent = ({
	children,
	acceptZoneOverride,
	rejectZoneOverride,
	idleZoneOverride,
	...props
}: DropzoneProps) => {
	return (
		<Dropzone
			maxSize={ 5 * 1024 ** 2 }
			{ ...props }
		>
			<Group justify="center" gap="xl" mih={ 220 } style={ { pointerEvents: 'none' } }>
				{ acceptZoneOverride ||
					<Dropzone.Accept>
						<IconUpload
							style={ { width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' } }
							stroke={ 1.5 }
						/>
					</Dropzone.Accept>
				}
				{ rejectZoneOverride ||
					<Dropzone.Reject>
						<IconX
							style={ { width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' } }
							stroke={ 1.5 }
						/>
					</Dropzone.Reject>
				}
				{ idleZoneOverride ||
					<Dropzone.Idle>
						<IconPhoto
							style={ { width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' } }
							stroke={ 1.5 }
						/>
					</Dropzone.Idle>
				}

				{ children }
			</Group>
		</Dropzone>
	)
}

export default DropzoneComponent
