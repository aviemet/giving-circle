# == Schema Information
#
# Table name: presentations_members
#
#  id              :bigint           not null, primary key
#  presentation_id :bigint           not null
#  member_id       :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :presentations_member do
    presentation { nil }
    member { nil }
  end
end
