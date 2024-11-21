# == Schema Information
#
# Table name: memberships_people
#
#  id            :uuid             not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  membership_id :uuid             not null
#  person_id     :uuid             not null
#
# Indexes
#
#  index_memberships_people_on_membership_id  (membership_id)
#  index_memberships_people_on_person_id      (person_id)
#
# Foreign Keys
#
#  fk_rails_...  (membership_id => memberships.id)
#  fk_rails_...  (person_id => people.id)
#
require 'rails_helper'

RSpec.describe MembershipsPerson, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
