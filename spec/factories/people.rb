# == Schema Information
#
# Table name: people
#
#  id          :uuid             not null, primary key
#  active      :boolean          default(TRUE), not null
#  first_name  :string
#  last_name   :string
#  middle_name :string
#  number      :string
#  slug        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
FactoryBot.define do
  factory :person do
    first_name { "MyString" }
    last_name { "MyString" }
    middle_name { "MyString" }
    active { false }
  end
end
