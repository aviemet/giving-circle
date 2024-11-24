# == Schema Information
#
# Table name: presentation_distributions
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  template   :boolean          default(FALSE), not null
#  type       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Presentation::Distribution < ApplicationRecord
  include Ownable
  include PresentationFeature
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:name, :type],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  scope :includes_associated, -> { includes([]) }
end
