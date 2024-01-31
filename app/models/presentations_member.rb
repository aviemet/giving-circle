# == Schema Information
#
# Table name: presentations_members
#
#  id              :bigint           not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  member_id       :bigint           not null
#  presentation_id :bigint           not null
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
class PresentationsMember < ApplicationRecord
  belongs_to :presentation
  belongs_to :member

  scope :includes_associated, -> { includes([:presentation, :member]) }
end
