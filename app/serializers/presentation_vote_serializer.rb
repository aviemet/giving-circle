# == Schema Information
#
# Table name: presentation_votes
#
#  id         :uuid             not null, primary key
#  name       :string
#  type       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class PresentationVoteSerializer < ApplicationSerializer
  object_as :presentation_vote

  

  attributes(
  )
end
