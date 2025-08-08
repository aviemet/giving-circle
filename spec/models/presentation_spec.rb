# == Schema Information
#
# Table name: presentations
#
#  id          :uuid             not null, primary key
#  active      :boolean          default(FALSE), not null
#  name        :string           not null
#  settings    :jsonb
#  slides      :jsonb
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  template_id :uuid
#  theme_id    :uuid             not null
#
# Indexes
#
#  index_presentations_on_slug         (slug) UNIQUE
#  index_presentations_on_template_id  (template_id)
#  index_presentations_on_theme_id     (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (template_id => templates.id)
#  fk_rails_...  (theme_id => themes.id)
#
require "rails_helper"

RSpec.describe Presentation do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build_stubbed(:presentation)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(name).each do |attr|
        expect(build(:presentation, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to belong_to(:theme) }
    it { is_expected.to have_many(:memberships).through(:presentations_memberships) }
    it { is_expected.to have_many(:orgs).through(:presentations_orgs) }
    it { is_expected.to have_many(:elements).through(:presentations_elements) }
  end

  describe "Templates" do
    it "works" do
      # presentation = create(:presentation)

    end
  end
end
