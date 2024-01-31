# == Schema Information
#
# Table name: presentations
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  theme_id   :bigint           not null
#
# Indexes
#
#  index_presentations_on_theme_id  (theme_id)
#
# Foreign Keys
#
#  fk_rails_...  (theme_id => themes.id)
#
require 'rails_helper'

RSpec.describe Presentation, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
