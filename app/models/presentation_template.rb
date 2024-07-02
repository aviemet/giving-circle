# == Schema Information
#
# Table name: presentation_templates
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PresentationTemplate < ApplicationRecord
  include PgSearch::Model

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
