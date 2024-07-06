# == Schema Information
#
# Table name: presentation_templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_presentation_templates_on_circle_id  (circle_id)
#  index_presentation_templates_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
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

  belongs_to :circle

  has_many :presentation_slides, dependent: :nullify

  scope :includes_associated, -> { includes([]) }
end
