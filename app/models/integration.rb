# == Schema Information
#
# Table name: integrations
#
#  id          :uuid             not null, primary key
#  active      :boolean          default(TRUE), not null
#  credentials :text             default("{}"), not null
#  medium      :string           not null
#  name        :string           not null
#  provider    :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  circle_id   :uuid             not null
#
# Indexes
#
#  index_integrations_on_circle_id               (circle_id)
#  index_integrations_on_circle_id_and_medium    (circle_id,medium)
#  index_integrations_on_circle_id_and_provider  (circle_id,provider)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class Integration < ApplicationRecord
  include EncryptedJsonCredentials

  PROVIDERS = Messaging::ProviderCatalog.providers_hash
  MEDIUMS = %w[email sms].freeze

  attribute :active, :boolean, default: true

  belongs_to :circle
  has_many :presentation_messages, class_name: "Presentation::Message", dependent: :nullify

  validates :name, presence: true
  validates :provider, presence: true, inclusion: { in: ->(_) { Messaging::ProviderCatalog.provider_ids } }
  validates :medium, presence: true, inclusion: { in: MEDIUMS }
  validate :medium_matches_provider
  validate :credentials_match_provider

  scope :active, -> { where(active: true) }
  scope :for_medium, ->(medium) { where(medium: medium) }
  scope :includes_associated, -> { includes([:circle]) }

  before_validation :assign_medium_from_provider

  def self.providers_for_medium(medium)
    Messaging::ProviderCatalog.providers_by_medium.fetch(medium.to_s, [])
  end

  private

  def assign_medium_from_provider
    return if provider.blank?

    assigned_medium = Messaging::ProviderCatalog.medium_for(provider)
    self.medium = assigned_medium if assigned_medium.present?
  end

  def medium_matches_provider
    return if provider.blank? || medium.blank?

    expected_medium = Messaging::ProviderCatalog.medium_for(provider)
    return if expected_medium == medium

    errors.add(:medium, :invalid)
  end

  def credentials_match_provider
    keys = Messaging::ProviderCatalog.credential_keys(provider)
    return if keys.nil?

    keys.each do |key|
      next if credentials.is_a?(Hash) && credentials[key.to_s].present?

      errors.add(:credentials, :blank)
      break
    end
  end
end
