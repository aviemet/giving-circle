# == Schema Information
#
# Table name: emails
#
#  id         :uuid             not null, primary key
#  email      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  contact_id :uuid
#
# Indexes
#
#  index_emails_on_contact_id  (contact_id)
#
require 'rails_helper'
require 'models/shared/contact_method'

RSpec.describe Email do
  describe "Associations" do
    it_behaves_like "contact_method"
  end
end
