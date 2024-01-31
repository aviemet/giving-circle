# == Schema Information
#
# Table name: presentations
#
#  id         :bigint           not null, primary key
#  theme_id   :bigint           not null
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Presentation, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
