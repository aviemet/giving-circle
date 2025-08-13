# == Schema Information
#
# Table name: templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  settings   :jsonb            not null
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

  extend FriendlyId

  friendly_id :name, use: [:slugged, :history]

  include PgSearchable

  pg_search_config(
    against: [:name, :settings, :slug, :slides],
  )

  resourcify

  has_many_attached :images

  has_many :slide_parents, as: :parentable, dependent: :delete_all
  has_many :slides, through: :slide_parents

  scope :includes_associated, -> { includes([:slides]) }

  def create_presentation(name, theme)
    presentation = Presentation.build({
      theme: theme,
      name: name,
      circle: self.circle,
    })
    presentation.copy_template_slides
    presentation
  end
end
