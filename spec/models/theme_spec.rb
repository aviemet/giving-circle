# == Schema Information
#
# Table name: themes
#
#  id           :bigint           not null, primary key
#  title        :string
#  slug         :string           not null
#  published_at :datetime
#  status       :integer          default("draft")
#  circle_id    :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
require 'rails_helper'

RSpec.describe Theme, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
