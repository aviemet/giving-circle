# == Schema Information
#
# Table name: interaction_config_templates
#
#  id         :uuid             not null, primary key
#  config     :jsonb            not null
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :uuid             not null
#
# Indexes
#
#  index_interaction_config_templates_on_circle_id           (circle_id)
#  index_interaction_config_templates_on_circle_id_and_slug  (circle_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class InteractionConfigTemplate < ApplicationRecord
  extend FriendlyId

  friendly_id :name, use: [:slugged, :scoped], scope: :circle

  include PgSearchable

  pg_search_config(against: [:name, :slug, :config])

  resourcify

  belongs_to :circle

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: { scope: :circle_id }
  validates :config, presence: true
  validate :validate_config_structure

  scope :includes_associated, -> { includes([:circle]) }

  def should_generate_new_friendly_id?
    name_changed? || super
  end

  private

  def validate_config_structure
    interaction = Presentation::Interaction.new(config: config)
    Presentation::Interaction::ConfigValidator.validate(interaction)
    interaction.errors[:config].each { |message| errors.add(:config, message) }
  end
end
