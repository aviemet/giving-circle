# == Schema Information
#
# Table name: presentation_interactions
#
#  id                 :uuid             not null, primary key
#  config             :jsonb
#  interaction_type   :integer
#  results            :jsonb
#  slug               :string
#  trigger_conditions :jsonb
#  trigger_type       :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
# Indexes
#
#  index_presentation_interactions_on_slug  (slug) UNIQUE
#
class Presentation::Interaction < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:slug, :interaction_type, :config, :results, :trigger_type, :trigger_conditions],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  scope :includes_associated, -> { includes([]) }
end
