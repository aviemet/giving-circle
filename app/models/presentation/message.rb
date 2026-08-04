# == Schema Information
#
# Table name: presentation_messages
#
#  id                  :uuid             not null, primary key
#  body                :text             default(""), not null
#  delivery_results    :jsonb            not null
#  medium              :string           not null
#  name                :string           not null
#  slug                :string           not null
#  status              :string           default("ready"), not null
#  subject             :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  integration_id      :uuid
#  message_template_id :uuid
#  presentation_id     :uuid             not null
#  skip_interaction_id :uuid
#
# Indexes
#
#  index_presentation_messages_on_integration_id            (integration_id)
#  index_presentation_messages_on_message_template_id       (message_template_id)
#  index_presentation_messages_on_presentation_id           (presentation_id)
#  index_presentation_messages_on_presentation_id_and_slug  (presentation_id,slug) UNIQUE
#  index_presentation_messages_on_skip_interaction_id       (skip_interaction_id)
#
# Foreign Keys
#
#  fk_rails_...  (integration_id => integrations.id)
#  fk_rails_...  (message_template_id => message_templates.id)
#  fk_rails_...  (presentation_id => presentations.id)
#  fk_rails_...  (skip_interaction_id => presentation_interactions.id)
#
class Presentation::Message < ApplicationRecord
  extend FriendlyId

  STATUSES = %w[ready sending finished].freeze
  MEDIUMS = Integration::MEDIUMS

  friendly_id :name, use: [:slugged, :scoped], scope: :presentation

  include PgSearchable
  pg_search_config(against: [:name, :slug, :subject, :body])

  resourcify

  self.table_name = "presentation_messages"

  belongs_to :presentation
  belongs_to :message_template, optional: true
  belongs_to :integration, optional: true
  belongs_to :skip_interaction, class_name: "Presentation::Interaction", optional: true

  validates :name, presence: true
  validates :slug, presence: true, uniqueness: { scope: :presentation_id }
  validates :medium, presence: true, inclusion: { in: MEDIUMS }
  validates :body, presence: true
  validates :subject, presence: true, if: -> { medium == "email" }
  validates :status, presence: true, inclusion: { in: STATUSES }
  validate :integration_medium_matches

  attr_readonly :medium

  scope :includes_associated, -> {
    includes([:presentation, :message_template, :integration, :skip_interaction])
  }

  def should_generate_new_friendly_id?
    name_changed? || super
  end

  def ready?
    status == "ready"
  end

  def sending?
    status == "sending"
  end

  def finished?
    status == "finished"
  end

  def self.copy_from_template!(presentation:, message_template:, attrs: {})
    create!(
      {
        presentation: presentation,
        message_template: message_template,
        name: message_template.name,
        medium: message_template.medium,
        subject: message_template.subject,
        body: message_template.body,
        status: "ready",
        delivery_results: {},
      }.merge(attrs),
    )
  end

  private

  def integration_medium_matches
    return if integration.nil?
    return if integration.medium == medium

    errors.add(:integration_id, :invalid)
  end
end
