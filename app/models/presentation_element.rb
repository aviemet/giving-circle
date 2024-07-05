# == Schema Information
#
# Table name: presentation_elements
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  element    :integer
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PresentationElement < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:title, :data, :element],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  scope :includes_associated, -> { includes([]) }
end
