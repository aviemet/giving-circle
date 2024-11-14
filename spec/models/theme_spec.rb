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

  # Database Columns
  describe 'database columns' do
    it { is_expected.to have_db_column(:id).of_type(:uuid) }
    it { is_expected.to have_db_column(:name).of_type(:string) }
    it { is_expected.to have_db_column(:published_at).of_type(:datetime) }
    it { is_expected.to have_db_column(:slug).of_type(:string).with_options(null: false) }
    it { is_expected.to have_db_column(:status).of_type(:integer).with_options(default: 'draft') }
    it { is_expected.to have_db_column(:created_at).of_type(:datetime).with_options(null: false) }
    it { is_expected.to have_db_column(:updated_at).of_type(:datetime).with_options(null: false) }
    it { is_expected.to have_db_column(:circle_id).of_type(:uuid).with_options(null: false) }
  end

  # Indexes
  describe 'indexes' do
    it { is_expected.to have_db_index(:circle_id) }
    it { is_expected.to have_db_index(:slug).unique(true) }
  end

  # Enums
  describe 'enums' do
    it { is_expected.to define_enum_for(:status).with_values(draft: 0, current: 1, past: 2, future: 3) }
  end

  # Scopes
  describe 'scopes' do
    describe '.includes_associated' do
      it 'includes the correct associations' do
        expect(described_class.includes_associated.to_sql).to include('LEFT OUTER JOIN "circles"')
        expect(described_class.includes_associated.to_sql).to include('LEFT OUTER JOIN "presentations"')
        expect(described_class.includes_associated.to_sql).to include('LEFT OUTER JOIN "orgs"')
      end
    end
  end

  # FriendlyId
  describe 'friendly_id' do
    it 'generates a slug from the name' do
      theme = create(:theme, name: 'Sample Theme')
      expect(theme.slug).to eq('sample-theme')
    end

    it 'updates the slug history when the name changes' do
      theme = create(:theme, name: 'Old Name')
      theme.update(name: 'New Name')
      expect(theme.slug).to eq('new-name')
      expect(theme.friendly_id_history).to include('old-name')
    end
  end

  # pg_search_scope
  describe '.search' do
    it 'returns themes matching the search query' do
      theme1 = create(:theme, name: 'Ruby Conference')
      theme2 = create(:theme, name: 'JavaScript Summit')
      expect(described_class.search('Ruby')).to include(theme1)
      expect(described_class.search('Ruby')).not_to include(theme2)
    end
  end

  # BooleanTimestamp (for published_at)
  describe 'boolean timestamp' do
    it 'responds to boolean_timestamp methods for published_at' do
      theme = create(:theme)
      expect(theme).to respond_to(:published?)
      expect(theme).to respond_to(:published!)
    end
  end
end
