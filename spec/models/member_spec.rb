# == Schema Information
#
# Table name: people
#
#  id             :uuid             not null, primary key
#  active         :boolean          default(TRUE), not null
#  first_name     :string
#  funds_cents    :integer
#  funds_currency :string           default("USD"), not null
#  last_name      :string
#  middle_name    :string
#  number         :string
#  slug           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
# Indexes
#
#  index_people_on_slug  (slug) UNIQUE
#
require 'rails_helper'

RSpec.describe Member, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
