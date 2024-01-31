# == Schema Information
#
# Table name: circles_members
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  circle_id  :bigint           not null
#  member_id  :bigint           not null
#
# Indexes
#
#  index_circles_members_on_circle_id  (circle_id)
#  index_circles_members_on_member_id  (member_id)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#  fk_rails_...  (member_id => people.id)
#
class CirclesMember < ApplicationRecord
  belongs_to :circle
  belongs_to :member

  scope :includes_associated, -> { includes([:cirlce, :member]) }
end
