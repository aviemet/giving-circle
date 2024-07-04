# == Schema Information
#
# Table name: circles
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  slug       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_circles_on_slug  (slug) UNIQUE
#
require 'rails_helper'

RSpec.describe Circle, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
