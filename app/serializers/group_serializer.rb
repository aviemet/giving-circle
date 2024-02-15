# == Schema Information
#
# Table name: groups
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :bigint           not null
#
# Indexes
#
#  index_groups_on_circle_id  (circle_id)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class GroupSerializer < ApplicationSerializer
  object_as :group

  identifier :slug

  attributes(
    :name,
    :circle_id,
  )
end
