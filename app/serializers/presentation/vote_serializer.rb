# == Schema Information
#
# Table name: presentation_votes
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Presentation::VoteSerializer < ApplicationSerializer
  object_as :presentation_vote
  
  attributes(
    :name,
    :type,
  )
end
