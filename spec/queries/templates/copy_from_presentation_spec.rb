require "rails_helper"

RSpec.describe Templates::CopyFromPresentation do
  describe ".call with a new template name" do
    it "creates a template with copied slides" do
      circle = create(:circle)
      theme = create(:theme, circle:)
      template = create(:template, circle:)
      presentation = create(:presentation, theme:, template:)
      presentation.slides << create(:slide, title: "Intro")

      result = described_class.call(presentation:, name: "Exported Template")

      expect(result).to be_persisted
      expect(result.name).to eq("Exported Template")
      expect(result.circle).to eq(circle)
      expect(result.slides.count).to eq(1)
      expect(result.slides.first.title).to eq("Intro")
      expect(result.slides.first.source_slide_id).to be_nil
    end
  end

  describe ".call with an existing template" do
    it "replaces the template slides" do
      circle = create(:circle)
      theme = create(:theme, circle:)
      template = create(:template, circle:)
      presentation = create(:presentation, theme:, template:)
      presentation.slides << create(:slide, title: "Intro")

      existing = create(:template, circle:, name: "Existing")
      existing.slides << create(:slide, title: "Old")

      described_class.call(presentation:, template: existing)

      existing.reload
      expect(existing.slides.count).to eq(1)
      expect(existing.slides.first.title).to eq("Intro")
      expect(existing.version).to eq(1)
    end
  end
end
