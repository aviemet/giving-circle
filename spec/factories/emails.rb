# == Schema Information
#
# Table name: emails
#
#  id          :uuid             not null, primary key
#  email       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :uuid             not null
#  contact_id  :uuid
#
# Indexes
#
#  index_emails_on_category_id  (category_id)
#  index_emails_on_contact_id   (contact_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#
FactoryBot.define do
  factory :email do
    email { Faker::Internet.email }

    contact
    category factory: [:category, :for_email]
  end
end
