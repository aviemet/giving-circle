module Circle::Fonts
  ALLOWED_CONTENT_TYPES = [
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
    "application/vnd.ms-fontobject",
  ].freeze

  ALLOWED_EXTENSIONS = %w[.woff .woff2 .ttf .otf].freeze

  module_function

  def allowed_content_type?(content_type, filename)
    return true if content_type.present? && ALLOWED_CONTENT_TYPES.include?(content_type)

    extension = File.extname(filename.to_s).downcase
    ALLOWED_EXTENSIONS.include?(extension)
  end

  def family_from_filename(filename)
    stem = File.basename(filename.to_s, ".*")
    sanitized = stem.gsub(/[^a-zA-Z0-9\s_-]/, "").squeeze(" ").strip
    return "CustomFont" if sanitized.empty?

    sanitized
  end

  def blob_redirect_url(signed_id, filename)
    "/rails/active_storage/blobs/redirect/#{signed_id}/#{ERB::Util.url_encode(filename)}"
  end

  def find_or_attach!(circle, blob)
    existing_attachment = circle.fonts_attachments.find_by(blob_id: blob.id)
    return [existing_attachment, false] if existing_attachment

    duplicate_attachment = circle.fonts_attachments.joins(:blob).find_by(
      active_storage_blobs: { checksum: blob.checksum },
    )
    if duplicate_attachment
      blob.purge if blob.id != duplicate_attachment.blob_id
      return [duplicate_attachment, false]
    end

    [circle.fonts_attachments.create!(blob:), true]
  end
end
