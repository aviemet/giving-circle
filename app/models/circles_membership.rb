# == Schema Information
#
# Table name: circles_memberships
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  circle_id     :uuid             not null
#  membership_id :uuid             not null
#
# Indexes
#
#  index_circles_memberships_on_circle_id      (circle_id)
#  index_circles_memberships_on_membership_id  (membership_id)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#  fk_rails_...  (membership_id => memberships.id)
#
class CirclesMembership < ApplicationRecord
  belongs_to :circle
  belongs_to :membership
end
