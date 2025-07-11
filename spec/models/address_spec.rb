# == Schema Information
#
# Table name: addresses
#
#  id         :uuid             not null, primary key
#  address    :string
#  address_2  :string
#  city       :string
#  country    :string
#  postal     :string
#  region     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  contact_id :uuid             not null
#
# Indexes
#
#  index_addresses_on_contact_id  (contact_id)
#
# Foreign Keys
#
#  fk_rails_...  (contact_id => contacts.id)
#
# spec/models/address_spec.rb

require 'rails_helper'
require 'models/shared/contact_method'

RSpec.describe Address do
  describe "Associations" do
    it_behaves_like "contact_method"
  end
end
