# == Schema Information
#
# Table name: presentations_orgs
#
#  id              :uuid             not null, primary key
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
FactoryBot.define do
  factory :presentations_org do
    presentation { nil }
    org { nil }
  end
end
