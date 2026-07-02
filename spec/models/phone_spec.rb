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
require "rails_helper"
require "models/shared/contact_method"

RSpec.describe Phone do
  describe "Associations" do
    it_behaves_like "contact_method"
  end
end
