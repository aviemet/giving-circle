# == Schema Information
#
# Table name: addresses
#
#  id          :uuid             not null, primary key
#  address     :string
#  address_2   :string
#  city        :string
#  country     :string
#  postal      :string
#  region      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :uuid             not null
#  contact_id  :uuid             not null
#
# Indexes
#
#  index_addresses_on_category_id  (category_id)
#  index_addresses_on_contact_id   (contact_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (contact_id => contacts.id)
#
class Address < ApplicationRecord
  include Categorizable

  include PgSearchable
  pg_search_config(
    against: [:address, :address_2, :city, :region, :country, :postal, :contact],
    associated_against: {
      contact: [],
    },
  )

  resourcify

  belongs_to :contact

  scope :includes_associated, -> { includes([:contact, :category]) }
end
