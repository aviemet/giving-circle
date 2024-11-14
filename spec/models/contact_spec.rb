# == Schema Information
#
# Table name: contacts
#
#  id               :uuid             not null, primary key
#  contactable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  contactable_id   :uuid             not null
#
# Indexes
#
#  index_contacts_on_contactable  (contactable_type,contactable_id)
#
require 'rails_helper'

RSpec.describe Contact do
  describe "Associations" do
    it { is_expected.to have_many(:addresses) }
    it { is_expected.to have_many(:emails) }
    it { is_expected.to have_many(:phones) }
  end
end
