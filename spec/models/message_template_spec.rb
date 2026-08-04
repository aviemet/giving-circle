require "rails_helper"

# == Schema Information
#
# Table name: message_templates
#
#  id         :uuid             not null, primary key
#  body       :text             default(""), not null
#  medium     :string           not null
#  name       :string           not null
#  slug       :string           not null
#  subject    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_message_templates_on_circle_id           (circle_id)
#  index_message_templates_on_circle_id_and_slug  (circle_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
RSpec.describe MessageTemplate, type: :model do
  describe "Associations" do
    it { is_expected.to belong_to(:circle) }
    it { is_expected.to have_many(:templates).through(:templates_message_templates) }
  end

  it "requires a subject for email" do
    template = build(:message_template, subject: nil)

    expect(template).not_to be_valid
    expect(template.errors[:subject]).to be_present
  end

  it "allows blank subject for sms" do
    template = build(:message_template, :sms, subject: nil)

    expect(template).to be_valid
  end

  it "does not change medium after create" do
    template = create(:message_template, medium: "email")

    template.update(medium: "sms", subject: nil)

    expect(template.reload.medium).to eq("email")
  end
end
