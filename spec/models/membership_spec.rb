# == Schema Information
#
# Table name: memberships
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  funds_cents    :integer          default(0), not null
#  funds_currency :string           default("USD"), not null
#  name           :string           not null
#  number         :string
#  slug           :string
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  person_id      :uuid             not null
#
# Indexes
#
#  index_memberships_on_person_id  (person_id)
#  index_memberships_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (person_id => people.id)
#
require 'rails_helper'

require "models/shared/ownable"

RSpec.describe Membership do
  describe 'Validations' do
    it 'is valid with valid attributes' do
      expect(build(:membership)).to be_valid
    end

    it 'is invalid with invalid attributes' do
      %i(name number).each do |attr|
        expect(build(:membership, attr => nil)).not_to be_valid
      end
    end
  end

  describe 'Attributes' do
    it { is_expected.to monetize(:funds) }
  end

  describe 'Associations' do
    it_behaves_like 'ownable'

    it { is_expected.to belong_to(:person) }
    it { is_expected.to have_many(:others).through(:memberships_people) }

    it { is_expected.to have_many(:presentations).through(:presentations_memberships) }

  end

  describe '#members' do
    context 'with no "others"' do
      it 'returns the primary member' do
        person = create(:person)
        membership = create(:membership, person:)

        expect(membership.members).to contain_exactly(person)
      end
    end
  end
end
