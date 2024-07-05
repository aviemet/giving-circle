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

RSpec.describe Email, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
