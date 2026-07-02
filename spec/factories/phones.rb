# == Schema Information
#
# Table name: phones
#
#  id          :uuid             not null, primary key
#  number      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :uuid             not null
#  contact_id  :uuid             not null
#
# Indexes
#
#  index_phones_on_category_id  (category_id)
#  index_phones_on_contact_id   (contact_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (contact_id => contacts.id)
#
FactoryBot.define do
  factory :phone do
    number { Faker::PhoneNumber.phone_number }

    contact
    category factory: [:category, :for_phone]
  end
end
