# == Schema Information
#
# Table name: templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  settings   :jsonb            not null
#  slides     :jsonb            not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_templates_on_slug  (slug) UNIQUE
#
class Template < ApplicationRecord
  include Ownable
  include PgSearch::Model

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  pg_search_scope(
    :search,
    against: [:name, :settings, :slug, :slides],
    using: {
      tsearch: { prefix: true },
      trigram: {}
    },
  )

  resourcify

  scope :includes_associated, -> { includes([]) }

  def create_presentation(name, theme)
    Presentation.build({
      theme: theme,
      name: name,
      slides: self.slides,
      circle: self.circle,
    })
  end
end
