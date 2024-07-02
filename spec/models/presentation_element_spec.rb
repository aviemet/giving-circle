# == Schema Information
#
# Table name: presentation_elements
#
#  id         :bigint           not null, primary key
#  data       :jsonb
#  element    :integer
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe PresentationElement, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
