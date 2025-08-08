# == Schema Information
#
# Table name: slides
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  slug       :string
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "rails_helper"

RSpec.describe Slide, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
