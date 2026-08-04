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
class IntegrationSerializer < ApplicationSerializer
  object_as :integration

  attributes(
    :name,
    :provider,
    :medium,
    :active,
  )

  attribute :credentials, type: :object do
    credentials = @object.credentials
    next {} unless credentials.is_a?(Hash)

    credentials.except("password", "auth_token", "api_token")
  end
end
