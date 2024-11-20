# == Schema Information
#
# Table name: presentation_slides
#
#  id         :uuid             not null, primary key
#  data       :jsonb
#  name       :string           not null
#  order      :integer
#  template   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe Presentation::Slide, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
