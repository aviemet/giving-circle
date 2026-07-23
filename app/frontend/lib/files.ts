import { DirectUpload } from "@rails/activestorage"

export {
	MIME_TYPES,
	IMAGE_MIME_TYPE,
	PDF_MIME_TYPE,
	MS_WORD_MIME_TYPE,
	MS_EXCEL_MIME_TYPE,
	MS_POWERPOINT_MIME_TYPE,
	EXE_MIME_TYPE,
} from "@mantine/dropzone"

export const FONT_MIME_TYPE = [
	"font/woff",
	"font/woff2",
	"font/ttf",
	"font/otf",
	"font/sfnt",
	"application/font-woff",
	"application/font-woff2",
	"application/x-font-ttf",
	"application/x-font-otf",
	"application/x-font-woff",
	".woff",
	".woff2",
	".ttf",
	".otf",
] as const

export function activeStorageBlobRedirectUrl(signedId: string, filename = "image") {
	return `/rails/active_storage/blobs/redirect/${signedId}/${filename}`
}

export const uploadFile = (file: File, onSuccess: (signedId: string) => void, onError: (error: Error) => void) => {
	const upload = new DirectUpload(file, "/rails/active_storage/direct_uploads")

	upload.create((error, blob) => {
		if(error) {
			onError(error)
		} else {
			onSuccess(blob!.signed_id)
		}
	})
}
