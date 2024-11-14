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
## spec/models/theme_spec.rb

require 'rails_helper'

RSpec.describe Theme do
  # Validations
  describe 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end

  # Associations
  describe 'associations' do
    it { is_expected.to belong_to(:circle) }
    it { is_expected.to have_many(:presentations).dependent(:destroy) }
    it { is_expected.to have_many(:themes_orgs).dependent(:destroy) }
    it { is_expected.to have_many(:orgs).through(:themes_orgs) }
  end

  # Enums
  describe 'enums' do
    it { is_expected.to define_enum_for(:status).with_values(draft: 0, current: 1, past: 2, future: 3) }
  end
end
