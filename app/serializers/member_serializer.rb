# == Schema Information
#
# Table name: members
#
#  id         :bigint           not null, primary key
#  first_name :string
#  last_name  :string
#  number     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class MemberSerializer < ApplicationSerializer
  object_as :member

  attributes(
    :first_name,
    :last_name,
    :number,
  )

end
