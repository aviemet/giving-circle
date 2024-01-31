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
FactoryBot.define do
  factory :themes_org do
    
  end
end
