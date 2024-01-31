# == Schema Information
#
# Table name: presentations_orgs
#
#  id              :bigint           not null, primary key
#  presentation_id :bigint           not null
#  org_id          :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :presentations_org do
    presentation { nil }
    org { nil }
  end
end
