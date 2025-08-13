# == Schema Information
#
# Table name: slides
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  slug       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Slide < ApplicationRecord
  include PgSearchable

  extend FriendlyId

  friendly_id :title, use: [:slugged, :history]

  def should_generate_new_friendly_id?
    title_changed? || super
  end

  pg_search_config(against: [:title, :data, :slug])

  tracked # public_activity
  resourcify # rolify

  has_one :slide_parent, dependent: :delete
  has_one :template, through: :slide_parent, source: :parentable, source_type: "Template"
  has_one :presentation, through: :slide_parent, source: :parentable, source_type: "Presentation"

  belongs_to :source_slide, class_name: "Slide"

  scope :includes_associated, -> { includes([:slide_parent, :template, :presentation]) }

  before_destroy :nullify_active_slide_references

  private

  def nullify_active_slide_references
    Presentation.where(active_slide_id: id).update_all(active_slide_id: nil) # rubocop:disable Rails/SkipsModelValidations
    SlideParent.where(slide_id: id).delete_all
  end
end
