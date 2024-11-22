# == Schema Information
#
# Table name: presentation_slides
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  order      :integer
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Presentation::Slide < ApplicationRecord
  include Ownable
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:name, :data, :order, :template],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  has_many :presentations_slides, dependent: :destroy, inverse_of: :slide
  has_many :presentations, through: :presentations_slides

  scope :templates, -> { where(template: true) }

  scope :includes_associated, -> { includes([]) }
end
