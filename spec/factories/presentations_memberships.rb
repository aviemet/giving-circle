# == Schema Information
#
# Table name: presentations_memberships
#
#  id              :uuid             not null, primary key
#  funds_cents     :integer
#  funds_currency  :string           default("USD"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  membership_id   :uuid             not null
#  presentation_id :uuid             not null
#
# Indexes
#
#  index_presentations_memberships_on_membership_id    (membership_id)
#  index_presentations_memberships_on_presentation_id  (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
FactoryBot.define do
  factory :presentations_membership do
    presentation
    membership
  end
end
