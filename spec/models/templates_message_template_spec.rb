require "rails_helper"

# == Schema Information
#
# Table name: templates_message_templates
#
#  id                  :uuid             not null, primary key
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  message_template_id :uuid             not null
#  template_id         :uuid             not null
#
# Indexes
#
#  index_templates_message_templates_on_message_template_id  (message_template_id)
#  index_templates_message_templates_on_template_id          (template_id)
#  index_templates_message_templates_uniqueness              (template_id,message_template_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (message_template_id => message_templates.id)
#  fk_rails_...  (template_id => templates.id)
#
RSpec.describe TemplatesMessageTemplate, type: :model do
  describe "Associations" do
    it { is_expected.to belong_to(:template) }
    it { is_expected.to belong_to(:message_template) }
  end

  it "does not allow the same message template twice on one template" do
    circle = create(:circle)
    template = create(:template, circle:)
    message_template = create(:message_template, circle:)
    create(:templates_message_template, template:, message_template:)

    duplicate = build(:templates_message_template, template:, message_template:)

    expect(duplicate).not_to be_valid
    expect(duplicate.errors[:message_template_id]).to be_present
  end
end
