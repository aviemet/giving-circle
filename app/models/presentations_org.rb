# == Schema Information
#
# Table name: presentations_orgs
#
#  id              :uuid             not null, primary key
#  ask_cents       :integer
#  ask_currency    :string           default("USD"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  org_id          :uuid             not null
#  presentation_id :uuid             not null
#
# Indexes
#
#  index_presentations_orgs_on_org_id           (org_id)
#  index_presentations_orgs_on_presentation_id  (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (org_id => orgs.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
class PresentationsOrg < ApplicationRecord
  belongs_to :presentation
  belongs_to :org

  before_validation :copy_ask_value

  monetize :ask_cents, numericality: { greater_than_or_equal_to: 0 }

  private

  def copy_ask_value
    return unless ask.nil? && presentation&.theme && org

    source_ask = presentation.theme.themes_orgs.find_by(org: org)&.ask
    self.ask = source_ask if source_ask
  end
end
