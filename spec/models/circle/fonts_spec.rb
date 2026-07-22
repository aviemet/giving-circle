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
end
