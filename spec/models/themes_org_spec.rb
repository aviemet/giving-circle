# == Schema Information
#
# Table name: themes_orgs
#
#  id         :bigint           not null, primary key
#  org_id     :bigint           not null
#  theme_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe ThemesOrg, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
