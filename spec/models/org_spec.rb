# == Schema Information
#
# Table name: orgs
#
#  id          :bigint           not null, primary key
#  description :string
#  name        :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
require 'rails_helper'

RSpec.describe Org, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
