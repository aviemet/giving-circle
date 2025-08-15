# == Schema Information
#
# Table name: templates
#
#  id         :uuid             not null, primary key
#  name       :string
#  settings   :jsonb            not null
#  slug       :string
#  version    :integer          default(0), not null
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

  before_update :regenerate_slug

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
      template: self,
    })
    presentation.copy_template_slides
    presentation
  end

  private

  def regenerate_slug
    return unless will_save_change_to_attribute?(:name)

    # Force slug regeneration
    self.slug = name.parameterize if name.present?
  end
end
