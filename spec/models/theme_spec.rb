# == Schema Information
#
# Table name: themes
#
#  id           :uuid             not null, primary key
#  name         :string
#  published_at :datetime
#  slug         :string           not null
#  status       :integer          default("draft")
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :uuid             not null
#
# Indexes
#
#  index_themes_on_circle_id  (circle_id)
#  index_themes_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#

require 'rails_helper'

RSpec.describe Theme do
  describe "Validations" do
    it "is valid with valid attributes" do
      expect(build_stubbed(:circle)).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(name).each do |attr|
        expect(build(:circle, attr => nil)).not_to be_valid
      end
    end
  end

  # Associations
  describe "Associations" do
    it { is_expected.to belong_to(:circle) }
    it { is_expected.to have_many(:presentations).dependent(:destroy) }
    it { is_expected.to have_many(:themes_orgs).dependent(:destroy) }
    it { is_expected.to have_many(:orgs).through(:themes_orgs) }
  end
end
