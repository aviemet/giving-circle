# == Schema Information
#
# Table name: presentation_elements
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  slug       :string
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_presentation_elements_on_slug  (slug) UNIQUE
#
class Presentation::Element < ApplicationRecord
  include PresentationFeature

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  include PgSearchable
  pg_search_config(against: [:name, :slug, :data])

  resourcify

  validates :name, presence: true

  scope :includes_associated, -> { includes([]) }
end
