import React from 'react'
import { Group, rem } from '@mantine/core'
import { Dropzone, type DropzoneProps as MantineDropzoneProps } from '@mantine/dropzone'
import { CrossIcon, PhotoIcon, UploadIcon } from '../Icons'

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
						<UploadIcon size={ 52 } />
					</Dropzone.Accept>
				}
				{ rejectZoneOverride ||
					<Dropzone.Reject>
						<CrossIcon  size={ 52 } />
					</Dropzone.Reject>
				}
				{ idleZoneOverride ||
					<Dropzone.Idle>
						<PhotoIcon size={ 52 } />
					</Dropzone.Idle>
				}

				{ children }
			</Group>
		</Dropzone>
	)
}

export default DropzoneComponent
