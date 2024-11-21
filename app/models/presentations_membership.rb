# == Schema Information
#
# Table name: presentations_members
#
#  id              :uuid             not null, primary key
#  funds_cents     :integer
#  funds_currency  :string           default("USD"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  member_id       :uuid             not null
#  presentation_id :uuid             not null
#
# Indexes
#
#  index_presentations_members_on_member_id        (member_id)
#  index_presentations_members_on_presentation_id  (presentation_id)
#
# Foreign Keys
#
#  fk_rails_...  (member_id => people.id)
#  fk_rails_...  (presentation_id => presentations.id)
#
class PresentationsMembership < ApplicationRecord
  belongs_to :presentation
  belongs_to :membership
end
