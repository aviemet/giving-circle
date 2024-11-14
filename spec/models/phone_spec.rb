# == Schema Information
#
# Table name: phones
#
#  id         :uuid             not null, primary key
#  number     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  contact_id :uuid
#
# Indexes
#
#  index_phones_on_contact_id  (contact_id)
#
require 'rails_helper'
require 'models/shared/contact_method'

RSpec.describe Phone do
  describe "Associations" do
    it_behaves_like "contact_method"
  end
end
