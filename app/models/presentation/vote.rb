# == Schema Information
#
# Table name: presentation_votes
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Presentation::Vote < ApplicationRecord
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

  has_many :presentations_votes, dependent: :destroy, inverse_of: :vote
  has_many :presentations, through: :presentations_votes

  scope :templates, -> { where(template: true) }

  scope :includes_associated, -> { includes([]) }
end
