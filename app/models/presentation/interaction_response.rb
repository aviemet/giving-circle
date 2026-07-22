# == Schema Information
#
# Table name: presentation_interaction_responses
#
#  id                          :uuid             not null, primary key
#  response_data               :jsonb            not null
#  created_at                  :datetime         not null
#  updated_at                  :datetime         not null
#  membership_id               :uuid             not null
#  presentation_interaction_id :uuid             not null
#
# Indexes
#
#  idx_on_presentation_interaction_id_d5003055ab                 (presentation_interaction_id)
#  idx_pres_interaction_responses_on_interaction_and_membership  (presentation_interaction_id,membership_id)
#  index_presentation_interaction_responses_on_membership_id     (membership_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (presentation_interaction_id => presentation_interactions.id)
#
class Presentation::InteractionResponse < ApplicationRecord
  include PgSearchable

  pg_search_config(
    against: [:response_data],
    associated_against: {
      presentation_interaction: [:name, :slug],
      membership: [],
    },
  )

  resourcify
  belongs_to :presentation_interaction, class_name: "Presentation::Interaction"
  belongs_to :membership

  validate :membership_belongs_to_presentation
  validate :validate_response_data_structure

  after_commit :schedule_presentation_values_refresh, on: [:create, :update, :destroy]

  scope :includes_associated, -> { includes([:presentation_interaction, :membership]) }

  private

  def membership_belongs_to_presentation
    presentation = presentation_interaction&.presentation
    return if presentation.blank? || membership.blank?
    return if presentation.presentations_memberships.exists?(membership_id: membership_id)

    errors.add(:membership, I18n.t("presentations.interaction_responses.validations.membership_belongs_to_presentation"))
  end

  def validate_response_data_structure
    Presentation::InteractionResponse::DataValidator.validate(self)
  end

  def schedule_presentation_values_refresh
    presentation = presentation_interaction&.presentation
    return unless presentation

    PresentationValues::Cache.schedule_refresh(presentation.id)
  end
end
