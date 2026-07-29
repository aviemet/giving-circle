# == Schema Information
#
# Table name: presentation_interactions
#
#  id                         :uuid             not null, primary key
#  accepting_responses        :boolean          default(FALSE), not null
#  config                     :jsonb            not null
#  name                       :string           not null
#  results                    :jsonb            not null
#  slug                       :string           not null
#  trigger_conditions         :jsonb            not null
#  trigger_type               :integer          default("manual"), not null
#  created_at                 :datetime         not null
#  updated_at                 :datetime         not null
#  interaction_ui_template_id :uuid             not null
#  presentation_id            :uuid             not null
#
# Indexes
#
#  index_presentation_interactions_on_interaction_ui_template_id  (interaction_ui_template_id)
#  index_presentation_interactions_on_presentation_id             (presentation_id)
#  index_presentation_interactions_on_presentation_id_and_slug    (presentation_id,slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (interaction_ui_template_id => interaction_ui_templates.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
class Presentation::Interaction < ApplicationRecord
  include PgSearchable

  extend FriendlyId
  friendly_id :name, use: [:slugged, :history, :scoped], scope: :presentation

  BLANK_CONFIG = {
    "fields" => [],
    "outputs" => [],
  }.freeze

  enum :trigger_type, {
    manual: 0,
    slide: 1,
  }, prefix: true

  pg_search_config(against: [:slug, :name, :config, :results, :trigger_conditions])

  resourcify

  belongs_to :presentation
  belongs_to :interaction_ui_template
  has_many :interaction_responses,
    class_name: "Presentation::InteractionResponse",
    foreign_key: :presentation_interaction_id,
    dependent: :destroy,
    inverse_of: :presentation_interaction
  has_many :interaction_memberships,
    class_name: "Presentation::InteractionMembership",
    foreign_key: :presentation_interaction_id,
    dependent: :destroy,
    inverse_of: :presentation_interaction

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: { scope: :presentation_id }
  validates :trigger_type, presence: true
  validates :config, presence: true
  validates :interaction_ui_template, presence: true
  validate :slide_trigger_requires_slide_slug, if: :trigger_type_slide?
  validate :validate_config_structure

  before_validation :assign_defaults, on: :create
  after_create :sync_interaction_memberships!

  scope :includes_associated, -> { includes([:presentation, :interaction_ui_template]) }
  scope :accepting_responses, -> { where(accepting_responses: true) }

  def should_generate_new_friendly_id?
    name_changed? || super
  end

  def open_responses!
    transaction do
      presentation.interactions.where.not(id: id).where(accepting_responses: true).update_all(accepting_responses: false)
      sync_interaction_memberships!
      update!(accepting_responses: true)
    end
  end

  def close_responses!
    update!(accepting_responses: false)
  end

  def settings
    (config.with_indifferent_access[:settings] || {}).with_indifferent_access
  end

  def available_votes_for(membership)
    return if membership.blank?

    interaction_memberships.find_by(membership_id: membership.id)&.votes
  end

  def sync_interaction_memberships!
    return unless presentation

    default_votes = settings[:default_votes]
    presentation.memberships.find_each do |membership|
      row = interaction_memberships.find_or_initialize_by(membership_id: membership.id)
      next if row.persisted? && row.votes.present?

      row.votes = default_votes if default_votes.present?
      row.save!
    end
  end

  private

  def slide_trigger_requires_slide_slug
    slide_slug = trigger_conditions.with_indifferent_access[:slide_slug]
    return if slide_slug.present?

    errors.add(:trigger_conditions, I18n.t("presentations.interactions.validations.slide_slug_required"))
  end

  def assign_defaults
    self.config = BLANK_CONFIG.deep_dup if config.blank?
    self.results = {} if results.nil?
    self.trigger_conditions = {} if trigger_conditions.nil?
    self.interaction_ui_template ||= InteractionUiTemplateDefaults.allocation
  end

  def validate_config_structure
    Presentation::Interaction::ConfigValidator.validate(self)
  end
end
