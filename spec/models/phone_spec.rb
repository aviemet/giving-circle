# == Schema Information
#
# Table name: phones
#
#  id         :bigint           not null, primary key
#  number     :string
#  contact_id :bigint
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Phone, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
