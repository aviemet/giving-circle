# == Schema Information
#
# Table name: presentation_interactions
#
#  id                         :uuid             not null, primary key
#  accepting_responses        :boolean          default(FALSE), not null
#  config                     :jsonb            not null
#  name                       :string           not null
#  results                    :jsonb            not null
#  slug                       :string           not null
#  trigger_conditions         :jsonb            not null
#  trigger_type               :integer          default("manual"), not null
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  interaction_ui_template_id :uuid             not null
#  presentation_id            :uuid             not null
#
# Indexes
#
#  index_presentation_interactions_on_interaction_ui_template_id  (interaction_ui_template_id)
#  index_presentation_interactions_on_presentation_id             (presentation_id)
#  index_presentation_interactions_on_presentation_id_and_slug    (presentation_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (interaction_ui_template_id => interaction_ui_templates.id)
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

  describe "interaction_ui_template" do
    it "defaults to the allocation ui template on create when blank" do
      InteractionUiTemplateDefaults.seed!
      interaction = build(:presentation_interaction, interaction_ui_template: nil)

      expect(interaction).to be_valid
      expect(interaction.interaction_ui_template.slug).to eq("allocation")
    end

    it "maps config template slugs to ui templates" do
      expect(InteractionUiTemplateDefaults.for_config_slug("allocation-round").slug).to eq("allocation")
      expect(InteractionUiTemplateDefaults.for_config_slug("org-vote").slug).to eq("org_vote")
      expect(InteractionUiTemplateDefaults.for_config_slug("finalist-vote").slug).to eq("finalist_vote")
      expect(InteractionUiTemplateDefaults.for_config_slug("pledges").slug).to eq("pledges")
    end
  end

  describe "#open_responses!" do
    it "opens the interaction and closes others on the same presentation" do
      presentation = create(:presentation)
      first = create(:presentation_interaction, presentation: presentation, accepting_responses: true)
      second = create(:presentation_interaction, presentation: presentation, accepting_responses: false)

      second.open_responses!

      expect(second.reload.accepting_responses).to be(true)
      expect(first.reload.accepting_responses).to be(false)
    end
  end
end
