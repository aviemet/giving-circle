# == Schema Information
#
# Table name: presentation_distributions
#
#  id         :uuid             not null, primary key
#  name       :string           not null
#  template   :boolean          default(FALSE), not null
#  type       :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require "rails_helper"

RSpec.describe Presentation::Distribution, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
