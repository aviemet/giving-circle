# == Schema Information
#
# Table name: contacts
#
#  id               :bigint           not null, primary key
#  contactable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  contactable_id   :bigint           not null
#
# Indexes
#
#  index_contacts_on_contactable  (contactable_type,contactable_id)
#
require 'rails_helper'

RSpec.describe Contact, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
