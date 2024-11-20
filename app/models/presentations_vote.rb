# == Schema Information
#
# Table name: presentations_votes
#
#  id                   :uuid             not null, primary key
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  presentation_id      :uuid             not null
#  presentation_vote_id :uuid             not null
#
# Indexes
#
#  index_presentations_votes_on_presentation_id       (presentation_id)
#  index_presentations_votes_on_presentation_vote_id  (presentation_vote_id)
#
# Foreign Keys
#
#  fk_rails_...  (presentation_id => presentations.id)
#  fk_rails_...  (presentation_vote_id => presentation_votes.id)
#
class PresentationsVote < ApplicationRecord
  belongs_to :presentation
  belongs_to :presentation_vote
end
