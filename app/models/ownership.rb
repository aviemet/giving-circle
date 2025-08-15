# == Schema Information
#
# Table name: ownerships
#
#  id           :uuid             not null, primary key
#  ownable_type :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  circle_id    :uuid             not null
#  ownable_id   :uuid             not null
#
# Indexes
#
#  index_ownerships_on_circle_id                    (circle_id)
#  index_ownerships_on_ownable                      (ownable_type,ownable_id)
#  index_ownerships_on_ownable_type_and_circle_id   (ownable_type,circle_id)
#  index_ownerships_on_ownable_type_and_ownable_id  (ownable_type,ownable_id)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
class Ownership < ApplicationRecord
  resourcify

  belongs_to :circle
  belongs_to :ownable, polymorphic: true
end
