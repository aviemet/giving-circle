# == Schema Information
#
# Table name: roles
#
#  id            :bigint           not null, primary key
#  name          :string
#  resource_type :string
#  resource_id   :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class RoleSerializer < ApplicationSerializer
  object_as :role

  attributes(
    :name,
    :resource_type,
    :resource_id,
    :created_at,
    :updated_at,
  )

  has_many :users, serializer: UserSerializer
end
