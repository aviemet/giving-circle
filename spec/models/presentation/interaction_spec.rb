# == Schema Information
#
# Table name: presentation_interactions
#
#  id                  :uuid             not null, primary key
#  accepting_responses :boolean          default(FALSE), not null
#  config              :jsonb            not null
#  name                :string           not null
#  results             :jsonb            not null
#  slug                :string           not null
#  trigger_conditions  :jsonb            not null
#  trigger_type        :integer          default("manual"), not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  presentation_id     :uuid             not null
#
# Indexes
#
#  index_presentation_interactions_on_presentation_id           (presentation_id)
#  index_presentation_interactions_on_presentation_id_and_slug  (presentation_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (presentation_id => presentations.id)
#
require "rails_helper"

RSpec.describe Presentation::Interaction, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      expect(build(:presentation_interaction)).to be_valid
    end

    it "requires a name" do
      expect(build(:presentation_interaction, name: nil)).not_to be_valid
    end

    it "requires a trigger_type" do
      interaction = build(:presentation_interaction)
      interaction.trigger_type = nil

      expect(interaction).not_to be_valid
      expect(interaction.errors[:trigger_type]).to be_present
    end

    it "requires slide_slug in trigger_conditions when trigger type is slide" do
      interaction = build(
        :presentation_interaction,
        trigger_type: :slide,
        trigger_conditions: {},
      )

      expect(interaction).not_to be_valid
      expect(interaction.errors[:trigger_conditions]).to be_present
    end

    it "assigns default blank config on create when config is blank" do
      interaction = build(:presentation_interaction, config: nil)

      expect(interaction).to be_valid
      expect(interaction.config).to eq(Presentation::Interaction::BLANK_CONFIG)
    end
  end

  describe "uniqueness" do
    it "enforces unique slugs per presentation" do
      presentation = create(:presentation)
      first = create(:presentation_interaction, presentation: presentation, name: "Vote Round", slug: "vote")
      second = create(:presentation_interaction, presentation: presentation, name: "Other Round", slug: "other-round")

      second.slug = first.slug
      expect(second).not_to be_valid
      expect(second.errors[:slug]).to be_present
    end

    it "allows the same slug on different presentations" do
      create(:presentation_interaction, slug: "vote")
      duplicate = build(:presentation_interaction, slug: "vote")

      expect(duplicate).to be_valid
    end
  end
end
