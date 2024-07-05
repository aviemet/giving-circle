# == Schema Information
#
# Table name: presentation_templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_presentation_templates_on_slug  (slug) UNIQUE
#
class PresentationTemplate < ApplicationRecord
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:name],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  has_many :presentation_slides, dependent: :nullify

  scope :includes_associated, -> { includes([]) }
end
