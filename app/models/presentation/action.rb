# == Schema Information
#
# Table name: presentation_actions
#
#  id                 :uuid             not null, primary key
#  action_type        :integer
#  config             :jsonb
#  results            :jsonb
#  slug               :string
#  trigger_conditions :jsonb
#  trigger_type       :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class Presentation::Action < ApplicationRecord
  include PgSearch::Model

  pg_search_scope(
    :search,
    against: [:slug, :action_type, :config, :results, :trigger_type, :trigger_conditions],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  scope :includes_associated, -> { includes([]) }
end
