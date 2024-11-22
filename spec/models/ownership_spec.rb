# == Schema Information
#
# Table name: ownerships
#
#  id           :uuid             not null, primary key
#  ownable_type :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :uuid             not null
#  ownable_id   :uuid             not null
#
# Indexes
#
#  index_ownerships_on_circle_id  (circle_id)
#  index_ownerships_on_ownable    (ownable_type,ownable_id)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
require 'rails_helper'

RSpec.describe Ownership do
  describe "Validations" do
    it "is valid with valid attributes" do
      ownership = build(:ownership, circle: build(:circle), ownable: build(:org))
      expect(ownership).to be_valid
    end

    it "is invalid with invalid attributes" do
      %i(circle ownable).each do |attr|
        expect(build(:ownership, attr => nil)).not_to be_valid
      end
    end
  end

  describe "Associations" do
    it { is_expected.to belong_to(:circle) }
    it { is_expected.to belong_to(:ownable) }
  end
end
