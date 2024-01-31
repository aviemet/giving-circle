# == Schema Information
#
# Table name: orgs
#
#  id          :bigint           not null, primary key
#  description :string
#  name        :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class OrgSerializer < ApplicationSerializer
  object_as :org

  identifier :slug

  attributes(
    :name,
    :description,
  )
end
