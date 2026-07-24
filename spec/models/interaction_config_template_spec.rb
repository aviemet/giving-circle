# == Schema Information
#
# Table name: interaction_config_templates
#
#  id                         :uuid             not null, primary key
#  config                     :jsonb            not null
#  name                       :string           not null
#  slug                       :string           not null
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  circle_id                  :uuid             not null
#  interaction_ui_template_id :uuid
#
# Indexes
#
#  idx_on_interaction_ui_template_id_fa86b6fe6b              (interaction_ui_template_id)
#  index_interaction_config_templates_on_circle_id           (circle_id)
#  index_interaction_config_templates_on_circle_id_and_slug  (circle_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#  fk_rails_...  (interaction_ui_template_id => interaction_ui_templates.id)
#
require "rails_helper"

RSpec.describe InteractionConfigTemplate, type: :model do
  describe "validations" do
    it "is valid with a valid config" do
      expect(build(:interaction_config_template)).to be_valid
    end

    it "rejects invalid config" do
      template = build(
        :interaction_config_template,
        config: {
          "fields" => [
            { "key" => "note", "type" => "text", "label" => "Note" },
          ],
          "outputs" => [
            {
              "metric" => "allocated_totals",
              "source_field" => "note",
              "reducer" => "sum_by_org",
            },
          ],
        },
      )

      expect(template).not_to be_valid
      expect(template.errors[:config]).to be_present
    end
  end
end
