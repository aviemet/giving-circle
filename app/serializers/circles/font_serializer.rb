class Circles::FontSerializer < ApplicationSerializer
  object_as :font, model: "ActiveStorage::Attachment"

  attribute :signed_id, type: :string do
    font.blob.signed_id
  end

  attribute :filename, type: :string do
    font.blob.filename.to_s
  end

  attribute :family, type: :string do
    Circle::Fonts.family_from_filename(font.blob.filename.to_s)
  end

  attribute :url, type: :string do
    Circle::Fonts.blob_redirect_url(font.blob.signed_id, font.blob.filename.to_s)
  end
end
