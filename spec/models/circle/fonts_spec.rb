require "rails_helper"

RSpec.describe Circle::Fonts do
  describe ".family_from_filename" do
    it "uses the filename stem as the CSS family" do
      expect(described_class.family_from_filename("Brand Sans.woff2")).to eq("Brand Sans")
    end

    it "falls back when the stem is empty" do
      expect(described_class.family_from_filename("!!!")).to eq("CustomFont")
    end
  end

  describe ".allowed_content_type?" do
    it "allows known font content types" do
      expect(described_class.allowed_content_type?("font/woff2", "x.bin")).to be(true)
    end

    it "allows known extensions when content type is missing" do
      expect(described_class.allowed_content_type?(nil, "Display.otf")).to be(true)
    end

    it "rejects non-font files" do
      expect(described_class.allowed_content_type?("text/plain", "notes.txt")).to be(false)
    end
  end

  describe ".find_or_attach!" do
    it "attaches a new font blob" do
      circle = create(:circle)
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("font-bytes"),
        filename: "Brand.woff2",
        content_type: "font/woff2",
      )

      attachment, created = described_class.find_or_attach!(circle, blob)

      expect(created).to be(true)
      expect(attachment.blob_id).to eq(blob.id)
      expect(circle.fonts.count).to eq(1)
    end

    it "attaches a new font blob inside an open transaction" do
      circle = create(:circle)
      first_blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("font-bytes-one"),
        filename: "Brand.woff2",
        content_type: "font/woff2",
      )
      second_blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("font-bytes-two"),
        filename: "Display.otf",
        content_type: "font/otf",
      )

      Circle.transaction do
        first_attachment, first_created = described_class.find_or_attach!(circle, first_blob)
        second_attachment, second_created = described_class.find_or_attach!(circle, second_blob)

        expect(first_created).to be(true)
        expect(second_created).to be(true)
        expect(first_attachment.blob_id).to eq(first_blob.id)
        expect(second_attachment.blob_id).to eq(second_blob.id)
      end

      expect(circle.fonts_attachments.map(&:blob_id)).to contain_exactly(first_blob.id, second_blob.id)
    end

    it "reuses an existing attachment for the same blob" do
      circle = create(:circle)
      blob = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("font-bytes"),
        filename: "Brand.woff2",
        content_type: "font/woff2",
      )
      circle.fonts.attach(blob)

      attachment, created = described_class.find_or_attach!(circle, blob)

      expect(created).to be(false)
      expect(attachment.blob_id).to eq(blob.id)
      expect(circle.fonts.count).to eq(1)
    end

    it "reuses an existing font with the same checksum and purges the duplicate blob" do
      circle = create(:circle)
      original = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("font-bytes"),
        filename: "Brand.woff2",
        content_type: "font/woff2",
      )
      circle.fonts.attach(original)
      duplicate = ActiveStorage::Blob.create_and_upload!(
        io: StringIO.new("font-bytes"),
        filename: "Brand Copy.woff2",
        content_type: "font/woff2",
      )
      duplicate_id = duplicate.id

      attachment, created = described_class.find_or_attach!(circle, duplicate)

      expect(created).to be(false)
      expect(attachment.blob_id).to eq(original.id)
      expect(circle.fonts.count).to eq(1)
      expect(ActiveStorage::Blob.exists?(duplicate_id)).to be(false)
    end
  end
end
