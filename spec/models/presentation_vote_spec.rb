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
require 'rails_helper'

RSpec.describe PresentationVote, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
