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
#  index_ownerships_on_circle_id  (circle_id)
#  index_ownerships_on_ownable    (ownable_type,ownable_id)
#
# Foreign Keys
#
#  fk_rails_...  (circle_id => circles.id)
#
require 'rails_helper'

RSpec.describe Ownership, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
