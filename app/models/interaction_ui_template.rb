# == Schema Information
#
# Table name: interaction_ui_templates
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_interaction_ui_templates_on_slug  (slug) UNIQUE
#
class InteractionUiTemplate < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: [:slugged, :history]

  include PgSearchable
  pg_search_config(against: [:name, :slug])

  resourcify

  has_many :presentation_interactions,
    class_name: "Presentation::Interaction",
    dependent: :restrict_with_exception,
    inverse_of: :interaction_ui_template
  has_many :interaction_config_templates, dependent: :nullify

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: true

  def should_generate_new_friendly_id?
    slug.blank? || (persisted? && name_changed?)
  end
end
