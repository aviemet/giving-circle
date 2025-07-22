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
