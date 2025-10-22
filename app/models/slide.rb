# == Schema Information
#
# Table name: slides
#
#  id              :uuid             not null, primary key
#  data            :jsonb
#  slug            :string
#  title           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  source_slide_id :uuid
#
# Indexes
#
#  index_slides_on_slug             (slug)
#  index_slides_on_source_slide_id  (source_slide_id)
#
# Foreign Keys
#
#  fk_rails_...  (source_slide_id => slides.id)
#
class Slide < ApplicationRecord
  include PgSearchable

  extend FriendlyId
  friendly_id :title, use: [:history, :scoped], scope: :parent

  before_update :increment_template_version

  def should_generate_new_friendly_id?
    title_changed? || super
  end

  pg_search_config(against: [:title, :data, :slug])

  tracked # public_activity
  resourcify # rolify

  has_many_attached :images

  has_one :slide_parent, dependent: :delete
  has_one :template, through: :slide_parent, source: :parentable, source_type: "Template"
  has_one :presentation, through: :slide_parent, source: :parentable, source_type: "Presentation"

  belongs_to :source_slide, class_name: "Slide", optional: true

  scope :includes_associated, -> { includes([:slide_parent, :template, :presentation]) }

  def parent
    template || presentation
  end

  before_destroy :nullify_active_slide_references

  private

  def nullify_active_slide_references
    Presentation.where(active_slide_id: id).update_all(active_slide_id: nil) # rubocop:disable Rails/SkipsModelValidations
    SlideParent.where(slide_id: id).delete_all
  end

  def increment_template_version
    return if template.nil?

    template.version = template.version.nil? ? 0 : template.version + 1

    template.save
  end
end
