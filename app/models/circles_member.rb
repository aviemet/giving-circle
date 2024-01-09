# == Schema Information
#
# Table name: circles_members
#
#  id         :bigint           not null, primary key
#  circle_id  :bigint           not null
#  member_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CirclesMember < ApplicationRecord
  belongs_to :circle
  belongs_to :member

  scope :includes_associated, -> { includes([:cirlce, :member]) }
end
