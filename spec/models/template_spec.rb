# == Schema Information
#
# Table name: templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  settings   :jsonb            not null
#  slug       :string
#  version    :integer          default(0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_templates_on_circle_id  (circle_id)
#  index_templates_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
require "rails_helper"

RSpec.describe Template, type: :model do
  describe "Associations" do
    it { is_expected.to belong_to(:circle) }
    it { is_expected.to have_many(:slides).through(:slide_parents) }
    it { is_expected.to have_many(:message_templates).through(:templates_message_templates) }
  end

  describe "#create_presentation" do
    it "creates a presentation and copies template slides and linked messages" do
      circle = create(:circle)
      theme = create(:theme, circle:)
      template = create(:template, circle:)
      slide = create(:slide, title: "Intro")
      template.slides << slide
      email_template = create(:message_template, circle:, name: "Interact invitation")
      sms_template = create(:message_template, :sms, circle:, name: "Interact invitation SMS")
      unrelated_template = create(:message_template, circle:, name: "Unrelated")
      template.message_templates = [email_template, sms_template]

      presentation = template.create_presentation("Allocation Night", theme)

      expect(presentation).to be_persisted
      expect(presentation.template).to eq(template)
      expect(presentation.slides.count).to eq(1)
      expect(presentation.slides.first.title).to eq("Intro")
      expect(presentation.slides.first.source_slide).to eq(slide)
      expect(presentation.messages.count).to eq(2)
      expect(presentation.messages.map(&:name)).to contain_exactly(
        "Interact invitation",
        "Interact invitation SMS",
      )
      expect(presentation.messages.map(&:message_template)).to contain_exactly(
        email_template,
        sms_template,
      )
      expect(presentation.messages.map(&:message_template)).not_to include(unrelated_template)
    end
  end

  describe "slug regeneration" do
    it "updates the slug when the name changes" do
      template = create(:template, name: "Original Name")

      template.update!(name: "Renamed Template")

      expect(template.slug).to eq("renamed-template")
    end
  end
end
