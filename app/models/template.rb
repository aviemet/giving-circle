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
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_templates_on_circle_id  (circle_id)
#  index_templates_on_slug       (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class Template < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  include PgSearchable
  pg_search_config(
    against: [:name, :settings, :slug, :slides],
  )

  resourcify

  before_update :regenerate_slug

  has_many_attached :images

  belongs_to :circle

  has_many :slide_parents, as: :parentable, dependent: :delete_all
  has_many :slides, through: :slide_parents

  scope :includes_associated, -> { includes([:slides]) }

  def create_presentation(name, theme)
    presentation = Presentation.create!({
      theme: theme,
      name: name,
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
