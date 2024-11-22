# == Schema Information
#
# Table name: presentation_elements
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Presentation::Element < ApplicationRecord
  include Ownable
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:data, :name, :template],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  has_many :presentations_elements, dependent: :destroy, inverse_of: :element
  has_many :presentations, through: :presentations_elements

  scope :templates, -> { where(template: true) }

  scope :includes_associated, -> { includes([]) }
end
